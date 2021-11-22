const express = require("express")
const cors = require("cors")
const { connectDb } = require("./store/config/connect")

require("dotenv").config()

const app = express()
app.use(cors())

app.get("/api/searchresults", require('./routes/search').searchRoute)
app.get("/api/playaudio", require('./routes/playAudio').playAudioRoute)

connectDb()
    .then((res) => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}!`)
            console.log("-----------------------")
        })
    })
    .catch((error) => {
        console.log(error)
    })
