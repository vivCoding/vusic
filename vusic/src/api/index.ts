import { PlaylistAPIResult, SongAPIResult, SaveAPIResult } from '../types/api'
import { Playlist, Song } from '../types/song'

const apiUrl = process.env.VUE_APP_API_URL

export const searchSongs = async (query: string): Promise<SongAPIResult> => {
    const result: SongAPIResult = await fetch(`${apiUrl}/searchresults?query=${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (response.status != 200) {
            return { success: false }
        }
        return response.json()
    }).then((data: Song[]) => {
        return {
            success: true,
            data: data
        }
    }).catch((error) => {
        return { success: false }
    })
    return result
}

export const getPlaylist = async(playlistId: string): Promise<PlaylistAPIResult> => {
    const result: PlaylistAPIResult = await fetch(`${apiUrl}/getplaylist?query=${playlistId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (response.status != 200) {
            return { success : false }
        }
        return response.json()
    }).then((data: Playlist) => {
        return {
            success: true,
            data: data
        }
    }).catch((error) => {
        return { success: false }
    })
    return result
}
