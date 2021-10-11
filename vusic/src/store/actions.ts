export enum QUEUE {
    ADD_SONG = 'addSong',
    REMOVE_SONG = 'removeSong',
    MOVE_SONG_UP = 'moveSongUp',
    MOVE_SONG_DOWN = 'moveSongDown',
    CHANGE_SONG_POSITION = 'changeSongPosition',
    SAVE = 'saveQueue'
}

export enum SONG {
    SET_CURRENT = 'setCurrent',
    NEXT = 'next',
    PREVIOUS = 'previous'
}