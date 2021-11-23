const { Playlist } = require('../schemas')

const getPlaylist = async (id) => {
    try {
        const res = await Playlist.findById(id)
        return res
    } catch (error) {
        throw new Error(error)
    }
}

const savePlaylist = async (playlist) => {
    try {
        if (playlist._id) {
            await Playlist.updateOne(
                { _id: playlist._id },
                {
                    songs: playlist.songs,
                    time: new Date().toISOString()
                },
                { upsert: false }
            )
            return playlist._id
        } else {
            const newPlaylist = new Playlist({
                songs: playlist.songs,
                time: new Date().toISOString()
            })
            await newPlaylist.save()
            return newPlaylist.id
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { getPlaylist, savePlaylist }
