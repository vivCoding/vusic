import { QueuedSong, Song } from "./song";

export interface SongPayload {
    song: Song
}

export interface QueuedSongPayload {
    song: QueuedSong
}