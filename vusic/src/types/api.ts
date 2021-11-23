import { Playlist, Song } from "./song";

export interface APIResult {
    success: boolean,
    data?: any
}

export interface SongAPIResult extends APIResult {
    data?: Song[]
}

export interface PlaylistAPIResult extends APIResult {
    data?: Playlist
}

export interface SaveAPIResult extends APIResult {
    data?: number
}
