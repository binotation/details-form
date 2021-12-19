import express, { Application } from 'express'
import path from 'path'
import { Config } from './types'

const config: Config = require('../config.json')
const app: Application = express()

app.use(express.static(path.join(__dirname, config.buildPath)))
app.use(express.static(path.join(__dirname, config.publicPath)))

app.post('/submit', (req, res) => {
    res.send('This was a successful post request.')
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}.`)
})