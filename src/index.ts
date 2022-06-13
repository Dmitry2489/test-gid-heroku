import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {VideosRouter} from "./routes/videos-router";
const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.use(express.json())


const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!! Dima')
})

app.use('/videos', VideosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})