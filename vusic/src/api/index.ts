import { PlaylistAPIResult, SongAPIResult, SaveAPIResult } from '../types/api'
import { Playlist, Song } from '../types/song'

const apiUrl = process.env.VUE_APP_API_URL

export const searchSongs = async (query: string): Promise<SongAPIResult> => {
    const response = await fetch(`${apiUrl}/searchresults?query=${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log(error)
        return null
    })
    if (!response || response.status != 200) {
        return { success: false }
    }
    const data: Song[] = await response.json()
    return { success: true, data }
}

export const getPlaylist = async (playlistId: string): Promise<PlaylistAPIResult> => {
    const response = await fetch(`${apiUrl}/getplaylist?playlistId=${playlistId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log(error)
        return null
    })
    if (!response || response.status != 200) {
        return { success: false }
    }
    const data: Playlist = await response.json()
    return { success: true, data }
}

export const savePlaylist = async (playlist: Playlist): Promise<SaveAPIResult> => {
    const response = await fetch(`${apiUrl}/saveplaylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist)
    }).catch(error => {
        console.log(error)
        return null
    })
    if (!response || response.status != 200) {
        return { success: false }
    }
    const data: number = await response.json()
    return { success: true, data }
}
