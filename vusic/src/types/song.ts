export interface Song {
    videoId: string,
    title: string,
    thumbnail: string
}

export interface QueuedSong extends Song {
    queueId: number
}

export interface Playlist {
    _id?: string,
    songs: Song[]
}