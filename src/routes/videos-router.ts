import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const VideosRouter = Router({})

const titleValidation = body("title").trim().isLength({min: 3 , max: 40}).withMessage('Title length should be from 3 to 40 symbols')

VideosRouter.get('/', (req: Request, res: Response) => {
    const allVideos = videosRepository.allVideos()

    res.status(200).send(allVideos)
})

VideosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;

    if (!id) {
        res.status(404).json(
            {
                "errorsMessages": [
                    {
                        "message": "Id is required",
                        "field": "Id"
                    }
                ],
                "resultCode": 1
            }
        )
        return
    }

    // FIND VIDEO AND RETURN IT
    const video = videosRepository.findVideoById(id)
    // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
    if(!video) {
        res.sendStatus(404)
    } else {
        res.json(video)
    }
})

VideosRouter.post('/',
    // titleValidation,
    // inputValidationMiddleware,
    (req: Request, res: Response) => {
    // console.log(!req.body.title)
    //     console.log(req.body.title.trim().length)
    if (!req.body.title || req.body.title == null) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title is required",
                        "field": "title"
                    }
                ],
                "resultCode": 1
            }
        )
        return
    }
    if (req.body.title.length > 40) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title length should be from 3 to 40 symbols",
                        "field": "title"
                    }
                ],
                "resultCode": 1
            }
        )
        return
    }
    const newVideo = videosRepository.createVideo(req.body.title)
    res.status(201).send(newVideo)
})

VideosRouter.delete('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id

    const deleteVideo = videosRepository.deleteVideo(id)

    if(!deleteVideo) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})

VideosRouter.put('/:id',(req: Request, res: Response)=>{
    // put your code here
    const idVideo = +req.params.id;
    const titleVideo = req.body.title.trim()


    if (!titleVideo) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title is required",
                        "field": "title"
                    }
                ],
                "resultCode": 1
            }
        )
        return;
    }

   let dima =  titleVideo.length > 40
    let dim1 = titleVideo.length > 3

    if (titleVideo.length > 40  || titleVideo.length < 3) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title length should be from 3 to 40 symbols",
                        "field": "title"
                    }
                ],
                "resultCode": 1
            }
        )
        return;
    }

    const video = videosRepository.updateVideo(idVideo, titleVideo)

    if(video) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})