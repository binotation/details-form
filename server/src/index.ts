import express, { Application, Response } from 'express'
import path from 'path'
import fs from 'fs'
import Database from 'better-sqlite3'
import { Config, ResponseMessage } from './types'

const app: Application = express()
const formidable = require('express-formidable')

const config: Config = require('../config.json')
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
const selectPersonTokens = "SELECT token FROM access_token WHERE person = ? AND date_created > date(CURRENT_TIMESTAMP, '-7 day')"

app.use(express.static(path.join(__dirname, config.buildPath)))
app.use(express.static(path.join(__dirname, config.publicPath)))
app.use(formidable())

function validateToken(token: string, id: string): boolean {
    const personsTokens = db.prepare(selectPersonTokens).all(id)
    return personsTokens.reduce((prev: boolean, row: { token: number }) => row.token === parseInt(token) || prev, false)
}

app.post('/auth', (req: any, res: Response) => {
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const id: string = req.fields.id ?? ''
    const token: string = req.fields.token ?? ''

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

    res.status(status).send(responseMessage)
})

app.post('/submit', (req: any, res: Response) => {
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const id: string = req.fields.id ?? ''
    const token: string = req.fields.token ?? ''
    const data = req.fields.data ?? ''

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

    res.status(status).send(responseMessage)
})

app.post('/upload', (req: any, res: Response) => {
    let status: number = 500
    const responseMessage: ResponseMessage = {}
    const { id, token }: { id: string, token: string } = req.fields

    if ([id, token].includes('')) {
        status = 400
        responseMessage.error = { name: missingMandatoryParamsMsg }
    } else {
        const validToken = validateToken(token, id)
        if (validToken) {
            const dir = path.join(__dirname, config.blobStorageDir, id)
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)

            const completed: boolean = Object.values(req.files).every((file: any) => {
                try {
                    fs.writeFileSync(path.join(dir, file.name), fs.readFileSync(file.path))
                    return true
                }
                catch (err: any) {
                    responseMessage.error = { name: err.name, message: err.message.replace(dir, '[redacted]'), code: err.code }
                    return false
                }
            })

            status = completed ? 200 : 500
            responseMessage.authorized = true
        } else {
            status = 401
            responseMessage.authorized = false
        }
    }

    res.status(status).send(responseMessage)
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}.`)
})
