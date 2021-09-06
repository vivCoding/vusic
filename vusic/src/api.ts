import { SongAPIResult } from './types/api'
import { Song } from './types/song'

const apiUrl = process.env.VUE_APP_API_URL

export const searchSongs = async (query: string): Promise<SongAPIResult> => {
    console.log(apiUrl)
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
    })
    return result
}
