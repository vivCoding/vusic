const { getPlaylist, savePlaylist } = require('../../store')
const { searchVideosByIds } = require('../../youtube')

const getPlaylistRoute = async (req, res) => {
    const { playlistId } = req.query
    try {
        const { _id, songs } = await getPlaylist(playlistId)
        res.status(200).json({
            _id,
            songs
        })
    } catch (error) {
        res.status(404).send('404 playlist not found')
    }
}

const savePlaylistRoute = async (req, res) => {
    try {
        const result = await savePlaylist(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(503).send('error in saving')
    }
}

module.exports = { getPlaylistRoute, savePlaylistRoute }
