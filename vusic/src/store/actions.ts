export enum QUEUE {
    ADD_SONG = 'addSong',
    REMOVE_SONG = 'removeSong',
    MOVE_SONG_UP = 'moveSongUp',
    MOVE_SONG_DOWN = 'moveSongDown',
    CHANGE_SONG_POSITION = 'changeSongPosition',
}

export enum SONG {
    SET_CURRENT = 'setCurrent',
    NEXT = 'next',
    PREVIOUS = 'previous'
}

export enum PLAYLIST {
    SAVE = 'savePlaylist',
    GET = 'getPlaylist'
}

export enum NET {
    SET_FETCHING = 'fetching',
    FETCH_SUCCESS = 'fetchSuccess',
    FETCH_ERROR = 'fetchError',
    SET_SAVING = 'saving',
    SAVE_SUCCESS = 'saveSuccess',
    SAVE_ERROR = 'saveError'
}