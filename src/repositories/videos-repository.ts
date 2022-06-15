const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
    allVideos() {
        return videos
    },
    findVideoById(id: number) {
        const video = videos.find(v => v.id === id)

        if (video) {
            return video
        }
    },
    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo;
    },
    deleteVideo(id: number) {
        const index = videos.findIndex(v => v.id === id)

        if(index === -1) {
            return false;
        } else {
            videos.splice(index, 1)
            return  videos;
        }
    },
    updateVideo(id: number, title: string) {
        const index = videos.findIndex(v => v.id === id)

        if(index === -1) {
            return false;
        } else {
            videos[index].title = title
            return true;
        }
    }

}