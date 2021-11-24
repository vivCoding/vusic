const express = require("express")
const cors = require("cors")
const connectDb = require("./store/config/connect")

require("dotenv").config()
console.log('Running in', process.env.NODE_ENV, 'environment')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.options("*", cors())
app.use(cors())

app.use('/api', require('./routes/api'))
app.use('/', require('./routes/misc'))

connectDb()
    .then((res) => {
        app.listen(process.env.PORT || 8080, async () => {
            console.log(`Server running on port ${process.env.PORT || 8080}`)
            console.log("-----------------------")
            // const { savePlaylist } = require("./store")
            // const songs = [{
            //     videoId: "EL3m9L_rKl0",
            //     title: "tech n9ne - face off Remix (feat. joey cool, king iso & dwayne johnson) OKA Remix",
            //     thumbnail: "https://i.ytimg.com/vi/EL3m9L_rKl0/default.jpg"
            // }, {
            //     videoId: "kQS_Y0ljhKg",
            //     title: 	"【アカペラ】だから僕は音楽を辞めた - ヨルシカ｜Cover by Groovy groove",
            //     thumbnail: "https://i.ytimg.com/vi/kQS_Y0ljhKg/default.jpg",
            // }, {
            //     videoId: "28xCw031xL4",
            //     title: "piano stuff",
            //     thumbnail: "https://i.ytimg.com/vi/28xCw031xL4/default.jpg"
            // }]
            // const playlistId = await savePlaylist({ songs })
            // console.log(playlistId)
        })
    })
    .catch((error) => {
        console.log(error)
    })
