import express, { Application, Request, Response } from 'express'
import { OutgoingHttpHeaders } from 'http'
import path from 'path'
import Database from 'better-sqlite3'
import { Config, ResponseMessage } from './types'

const config: Config = require('../config.json')
const app: Application = express()
const db = new Database(path.join(__dirname, config.databasePath), { fileMustExist: true })
const missingMandatoryParamsMsg = 'Missing mandatory parameters'
const insertSql = `INSERT OR REPLACE INTO person VALUES (
    ?, @FirstName, @LastName, @Email, @Phone,
    @AddressLine, @AddressSuburb, @AddressState, @AddressPostalCode,
    @EmergencyContactName, @EmergencyContactPhone, @EmergencyContactRelationship,
    @BankAccountName, @BankAccountNumber, @BankBSB,
    @SuperChoice, @StapledSuper, @APRAUSI, @APRAMemberNumber,
    @SMSFName, @SMSFABN, @SMSFAccountName, @SMSFAccountNumber, @SMSFBSB, @SMSFElectronicServiceAddress, @SuperConfirmed,
    @TFN, @DateOfBirth, @EmployeePaidBasis, @IsAusResidentForTaxPurposes, @TaxFreeThresholdClaimed, @SeniorsPensioners,
    @TaxZoneOverseasInvalidCarer, @HasHelpDebt, @HasSupplementDebt, @TaxConfirmed,
    @ResidencyStatus, @Convicted, @ConvictionComment)`

app.use(express.static(path.join(__dirname, config.buildPath)))
app.use(express.static(path.join(__dirname, config.publicPath)))
app.use(express.json())

function validateToken(token: string, id: string): boolean {
    const personsTokens = db.prepare('SELECT token FROM access_token where person = ?').all(id)
    return personsTokens.reduce((prev: boolean, row: { token: number }) => row.token === parseInt(token) || prev, false)
}

app.post('/auth', (req: Request, res: Response) => {
    const headers: OutgoingHttpHeaders = { 'Content-Type': 'application/json' }
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const id: string = req.body['id'] ?? ''
    const token: string = req.body['token'] ?? ''

    if ([id, token].includes('')) {
        status = 400
        responseMessage.error = { name: missingMandatoryParamsMsg }

    } else {
        const validToken = validateToken(token, id)

        if (validToken) {
            status = 200
            responseMessage.authorized = true
        } else {
            status = 401
            responseMessage.authorized = false
        }
    }

    res.set(headers)
    res.status(status)
    res.send(JSON.stringify(responseMessage))
})

app.post('/submit', (req: Request, res: Response) => {
    const headers: OutgoingHttpHeaders = { 'Content-Type': 'application/json' }
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const id: string = req.body['id'] ?? ''
    const token: string = req.body['token'] ?? ''
    const data = req.body['data'] ?? ''

    if ([id, token, data].includes('')) {
        status = 400
        responseMessage.error = { name: missingMandatoryParamsMsg }

    } else {
        const validToken = validateToken(token, id)

        if (validToken) {
            try {
                const insertStatement = db.prepare(insertSql)
                insertStatement.run(id, data)
                status = 200
                responseMessage.authorized = true
            } catch (error: any) {
                status = 500
                responseMessage.error = { name: error.name, message: error.message, code: error.code }
            }
        } else {
            status = 401
            responseMessage.authorized = false
        }
    }

    res.set(headers)
    res.status(status)
    res.send(JSON.stringify(responseMessage))
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}.`)
})