import express, { Application, Request, Response } from 'express'
import { OutgoingHttpHeaders } from 'http'
import path from 'path'
import { Config, ResponseMessage } from './types'

const config: Config = require('../config.json')
const app: Application = express()

app.use(express.static(path.join(__dirname, config.buildPath)))
app.use(express.static(path.join(__dirname, config.publicPath)))
app.use(express.urlencoded({ extended: true }))

app.post('/auth', (req: Request, res: Response) => {
    const headers: OutgoingHttpHeaders = { 'Content-Type': 'application/json' }
    let status: number = 500
    const responseMessage: ResponseMessage = {}

    const params: URLSearchParams = new URLSearchParams(req.body)
    const id: string = params.get('id') ?? ''
    const token: string = params.get('token') ?? ''

    if ([id, token].includes('')) {
        status = 400
        responseMessage.error = 'Missing mandatory parameters.'

    } else {
        const clientTokens: any = {}
        config.registeredClients.forEach(client => {
            clientTokens[client.id] = client.token
        })
        
        if (clientTokens[id] === token) {
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