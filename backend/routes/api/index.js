const router = require('express').Router()

router.get('/searchresults', require('./search'))
router.get('/playaudio', require('./playAudio'))
router.get('/getplaylist', require('./playlist').getPlaylistRoute)
router.post('/saveplaylist', require('./playlist').savePlaylistRoute)

module.exports = router