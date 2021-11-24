import { getPlaylist, savePlaylist } from '@/api'
import { QueuedSong, Song } from '@/types/song'
import { PlaylistPayload, QueuedSongPayload, SongPayload } from '@/types/store'
import { InjectionKey } from '@vue/runtime-core'
import { ActionContext, createStore, Store, useStore as baseUseStore } from 'vuex'
import { NET, PLAYLIST, QUEUE, SONG } from './actions'

export interface StoreStateType {
    currentSong?: QueuedSong,
    queue: QueuedSong[],
    nextqueueId: number,
    playlistId?: string,
    net: {
        fetching: boolean,
        fetchError: boolean,
        saving: boolean,
        saveError: boolean,
    }
}

export default createStore<StoreStateType>({
    state: {
        // queue: JSON.parse(`[{"videoId":"WwnZeQiI6hQ","title":"The Old Man and the Sea","thumbnail":"https://i.ytimg.com/vi/WwnZeQiI6hQ/default.jpg", "queueId": 0},{"videoId":"F64yFFnZfkI","title":"ヨルシカ - 言って。(Music Video)","thumbnail":"https://i.ytimg.com/vi/F64yFFnZfkI/default.jpg", "queueId": 1},{"videoId":"F90Cw4l-8NY","title":"Bastille - Pompeii (Official Music Video)","thumbnail":"https://i.ytimg.com/vi/F90Cw4l-8NY/default.jpg", "queueId": 2},{"videoId":"08AUS7lfXCU","title":"Bastille - Distorted Light Beam (Official Video)","thumbnail":"https://i.ytimg.com/vi/08AUS7lfXCU/default.jpg", "queueId": 3}]`),
        queue: [],
        currentSong: undefined,
        nextqueueId: 0,
        playlistId: undefined,
        net: {
            fetching: false,
            fetchError: false,
            saveError: false,
            saving: false
        }
    },
    mutations: {
        [QUEUE.ADD_SONG] (state: StoreStateType, payload: SongPayload): void {
            console.log('adding', payload.song.videoId)
            // gets the next queue index by finding the current largest queue index, and adding 1
            state.nextqueueId = state.queue.length > 0 ? state.queue.reduce(
                (max = state.queue[0], song) => max = song.queueId > max.queueId ? song : max
            ).queueId + 1 : 0
            state.queue.push({
                ...payload.song,
                queueId: state.nextqueueId
            })
            if (state.queue.length == 1) {
                state.currentSong = state.queue[0]
            }
        },
        
        [QUEUE.REMOVE_SONG] (state: StoreStateType, payload: QueuedSongPayload): void {
            const songIndex = state.queue.indexOf(payload.song)
            state.queue = state.queue.filter(song => song.queueId != payload.song.queueId)
            if (state.currentSong && state.currentSong.queueId == payload.song.queueId) {
                state.currentSong = songIndex == state.queue.length ? undefined : state.queue[songIndex]
            }
        },

        [QUEUE.MOVE_SONG_UP] (state: StoreStateType, payload: QueuedSongPayload): void {
            const songIndex = state.queue.indexOf(payload.song)
            if (songIndex > 0) {
                state.queue[songIndex] = state.queue[songIndex - 1]
                state.queue[songIndex - 1] = payload.song
            }
        },

        [QUEUE.MOVE_SONG_DOWN] (state: StoreStateType, payload: QueuedSongPayload): void {
            const songIndex = state.queue.indexOf(payload.song)
            if (songIndex < state.queue.length - 1) {
                state.queue[songIndex] = state.queue[songIndex + 1]
                state.queue[songIndex + 1] = payload.song
            }
        },

        [SONG.SET_CURRENT] (state: StoreStateType, payload: QueuedSongPayload | undefined): void {
            state.currentSong = payload?.song ?? undefined
        },

        [SONG.NEXT] (state: StoreStateType): void {
            const songIndex = state.currentSong ? state.queue.indexOf(state.currentSong) : -1
            state.currentSong = songIndex == state.queue.length - 1 ? undefined : state.queue[songIndex + 1]
        },
        
        [SONG.PREVIOUS] (state: StoreStateType): void {
            const songIndex = state.currentSong ? state.queue.indexOf(state.currentSong) : state.queue.length
            state.currentSong = songIndex == 0 ? undefined : state.queue[songIndex - 1]
        },

        [NET.SET_FETCHING] (state: StoreStateType): void {
            state.net.fetching = true
            state.net.fetchError = false
        },

        [NET.FETCH_SUCCESS] (state: StoreStateType): void {
            state.net.fetching = false
            state.net.fetchError = false
        },

        [NET.FETCH_ERROR] (state: StoreStateType): void {
            state.net.fetchError = true
            state.net.fetching = true
        },

        [NET.SET_SAVING] (state: StoreStateType): void {
            state.net.saving = true
            state.net.saveError = false
        },

        [NET.SAVE_SUCCESS] (state: StoreStateType): void {
            state.net.saveError = false
            state.net.saving = false
        },

        [NET.SAVE_ERROR] (state: StoreStateType): void {
            state.net.saveError = true
            state.net.saving = false
        },

        setPlaylistId (state: StoreStateType, payload: string): void {
            state.playlistId = payload
        },

        setQueue (state: StoreStateType, payload: Song[]): void {
            state.net.fetchError = false
            state.queue = []
            payload.forEach((song, index) => {
                state.queue.push({
                    queueId: index,
                    ...song
                })
            })
        },
    },
    actions: {
        [PLAYLIST.SAVE] ({ commit, state}: ActionContext<StoreStateType, StoreStateType>) {
            console.log('saving playlist')
            commit(NET.SET_SAVING)
            savePlaylist({ _id: state.playlistId, songs: state.queue }).then(data => {
                if (data.success) {
                    commit(NET.SAVE_SUCCESS)
                    commit('setPlaylistId', data.data)
                    alert('Saved playlist! Your playlist ID is' + data.data)
                } else {
                    commit(NET.SAVE_ERROR)
                    alert('Oopsies! Something went wrong in saving. Try again later!')
                }
            })
        },

        [PLAYLIST.GET] ({ commit }: ActionContext<StoreStateType, StoreStateType>, payload: PlaylistPayload) {
            commit(NET.SET_FETCHING)
            getPlaylist(payload.playlistId).then(data => {
                if (data.success) {
                    commit(NET.FETCH_SUCCESS)
                    commit('setQueue', data.data?.songs)
                    commit('setPlaylistId', data.data?._id)
                } else {
                    commit(NET.FETCH_ERROR)
                }
            })
        }
    },
    modules: {}
})

export const key: InjectionKey<Store<StoreStateType>> = Symbol()

export const useStore = (): Store<StoreStateType> => {
    return baseUseStore(key)
}