const { google } = require("googleapis")
const ytdl = require("ytdl-core")

// youtube init
const youtube = google.youtube({
    version: "v3",
    auth: process.env.AUTH
})
const options = {
    quality: "lowest", 
    audioFormat: "mp3"
}

const searchVideos = async query => {
    console.log("- received search query for", query)
    const results = await youtube.search.list({
        part: "id, snippet",
        q: query,
        maxResults: process.env.MAX_RESULTS,
        type: "video",
        relevanceLanguage: "en"
    }).then(response => {
        if (response.status == 200) {
            const items = []
            response.data.items.forEach(item => {
                items.push({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.default.url
                })
            });
            return {
                status: 200,
                results: items
            }
        } else {
            console.log("youtube error")
            return { status: 500 }
        }
    }).catch(error => {
        console.log(error)
        return { status: 400 }
    })
    return results
}

const getAudio = videoId => {
    console.log("- getting audio for", videoId)
    try {
        return {
            status: 200, 
            audio: ytdl(`https://www.youtube.com/watch?v=${videoId}`, options)
        }
    } catch (exception) {
        return { status: 500 }
    }
}

module.exports = {
    searchVideos: searchVideos,
    getAudio: getAudio
}