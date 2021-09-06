import { Song } from "./song";

export interface APIResult {
    success: boolean,
    data?: any
}

export interface SongAPIResult extends APIResult {
    data?: Song[]
}