const ytdl = require("ytdl-core")

const options = {
    quality: "lowest", 
    audioFormat: "mp3"
}

const getAudio = (videoId) => {
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

module.exports = { getAudio }