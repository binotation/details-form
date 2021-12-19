import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.get("/", (req: Request,  res: Response) => {
    res.send("This is from express.js")
})

app.listen(5000, () => {
    console.log("server started on port 5000")
})