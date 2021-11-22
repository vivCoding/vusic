const { getAudio } = require("../youtube")

const playAudioRoute = (req, res) => {
    let videoId = req.query.videoId
    const audio = getAudio(videoId)
    if (audio.status == 200) {
        audio.audio.pipe(res)
    } else {
        res.status(audio.status).send("error")
    }
}

module.exports = { playAudioRoute }
