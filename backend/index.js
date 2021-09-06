const express = require("express")
const cors = require("cors")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()

const { searchVideos, getAudio } = require("./youtube")

// express init
const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}!`);
    console.log("-----------------------");
})

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.get("/api/searchresults", async (req, res) => {
    let query = req.query.query
    const results = await searchVideos(query)
    if (results.status == 200) {
        res.json(results.results)
    } else {
        res.status(results.status).send("error")
    }
})

app.get("/api/playaudio", (req, res) => {
    let videoId = req.query.videoId
    const audio = getAudio(videoId)
    if (audio.status == 200) {
        audio.audio.pipe(res)
    } else {
        res.status(audio.status).send("error")
    }
})