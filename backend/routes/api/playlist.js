const { getPlaylist, savePlaylist } = require('../../store')
const { searchVideosByIds } = require('../../youtube')

const getPlaylistRoute = async (req, res) => {
    const { playlistId } = req.query
    try {
        const dbResult = await getPlaylist(playlistId)
        // consideration
        const result = {
            _id: dbResult._id,
            songs: await searchVideosByIds(dbResult.songs)
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(404).send('404 page not found')
    }
}

const savePlaylistRoute = async (req, res) => {
    // const { playlist } = req
    // const result = await getPlaylist(playlistId)
    console.log(req)
    res.status(200).send('yo')
}

module.exports = { getPlaylistRoute, savePlaylistRoute }
