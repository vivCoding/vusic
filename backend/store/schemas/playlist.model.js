const mongoose = require('mongoose')



const options = {
    discriminationKey: 'playlist',
    collection: process.env.NODE_ENV === 'dev' ? 'dev-playlists' : 'playlists'
}

const playlistSchema = new mongoose.Schema(
    {
        songs: [
            {
                videoId: String,
                title: String,
                thumbnail: String
            }
        ],
        time: String,
    },
    options
)

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
