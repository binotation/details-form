import express, { Application, Request, Response } from 'express'
import { OutgoingHttpHeaders } from 'http'
import path from 'path'
import Database from 'better-sqlite3'
import { Config, ResponseMessage } from './types'

const config: Config = require('../config.json')
const app: Application = express()
const db = new Database(path.join(__dirname, config.databasePath), { fileMustExist: true })

app.use(express.static(path.join(__dirname, config.buildPath)))
app.use(express.static(path.join(__dirname, config.publicPath)))
app.use(express.json())

app.post('/auth', (req: Request, res: Response) => {
    const headers: OutgoingHttpHeaders = { 'Content-Type': 'application/json' }
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const id: string = req.body['id'] ?? ''
    const token: string = req.body['token'] ?? ''

    if ([id, token].includes('')) {
        status = 400
        responseMessage.error = 'Missing mandatory parameters.'

    } else {
        const personsTokens = db.prepare('SELECT token FROM access_token where person = ?').all(id)
        const validToken = personsTokens.reduce((prev: boolean, row: { token: number }) => row.token === parseInt(token) || prev, false)

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

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}.`)
})