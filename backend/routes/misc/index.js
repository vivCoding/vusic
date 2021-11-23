const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Hello world!')
})

router.get('*', (req, res) => {
    res.status(404).send('404 page not found')
})

module.exports = router