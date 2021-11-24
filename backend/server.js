const express = require("express")
const cors = require("cors")
const connectDb = require("./store/config/connect")
const path = require('path')

require("dotenv").config()
console.log('Running in', process.env.NODE_ENV, 'environment')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.options("*", cors())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api'))
app.use('/', require('./routes/static'))

connectDb()
    .then((res) => {
        app.listen(process.env.PORT || 8080, async () => {
            console.log(`Server running on port ${process.env.PORT || 8080}`)
            console.log("-----------------------")
        })
    })
    .catch((error) => {
        console.log(error)
    })
