import {Request, Response, Router} from "express";

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const VideosRouter = Router({})


VideosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})

VideosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    // FIND VIDEO AND RETURN IT
    const video = videos.find(v => v.id === id)
    // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
    if(!video) {
        res.sendStatus(404)
    } else {
        res.json(video)
    }
})

VideosRouter.post('/', (req: Request, res: Response) => {
    console.log(req.body.title)
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

VideosRouter.delete('/:id',(req: Request, res: Response)=>{
    // put your code here
    const id = +req.params.id;

    const index = videos.findIndex(v => v.id === id)

    if(index === -1) {
        res.sendStatus(404)
    } else {
        videos.splice(index, 1)
        res.sendStatus(204)
    }
})

VideosRouter.put('/:id',(req: Request, res: Response)=>{
    // put your code here
    const id = +req.params.id;
    const index = videos.findIndex(v => v.id === id)

    if (!req.body.title) {
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

    if(index === -1) {
        res.sendStatus(404)
    } else {
        videos[index].title = req.body.title
        res.sendStatus(202)
    }
})