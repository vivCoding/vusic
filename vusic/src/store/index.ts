import { QueuedSong } from '@/types/song'
import { QueuedSongPayload, SongPayload } from '@/types/store'
import { InjectionKey } from '@vue/runtime-core'
import { ActionContext, createStore, Store, useStore as baseUseStore } from 'vuex'
import { QUEUE, SONG } from './actions'

export interface StoreStateType {
    currentSong?: QueuedSong,
    queue: QueuedSong[],
    nextqueueId: number,
    queueShared: boolean
}

export default createStore<StoreStateType>({
    state: {
        queue: JSON.parse(`[{"videoId":"WwnZeQiI6hQ","title":"The Old Man and the Sea","thumbnail":"https://i.ytimg.com/vi/WwnZeQiI6hQ/default.jpg", "queueId": 0},{"videoId":"F64yFFnZfkI","title":"ヨルシカ - 言って。(Music Video)","thumbnail":"https://i.ytimg.com/vi/F64yFFnZfkI/default.jpg", "queueId": 1},{"videoId":"F90Cw4l-8NY","title":"Bastille - Pompeii (Official Music Video)","thumbnail":"https://i.ytimg.com/vi/F90Cw4l-8NY/default.jpg", "queueId": 2},{"videoId":"08AUS7lfXCU","title":"Bastille - Distorted Light Beam (Official Video)","thumbnail":"https://i.ytimg.com/vi/08AUS7lfXCU/default.jpg", "queueId": 3}]`),
        // queue: [],
        currentSong: undefined,
        nextqueueId: 0,
        queueShared: false
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

        shareQueue (state: StoreStateType): void {
            state.queueShared = true
        }
    },
    actions: {
        [QUEUE.SAVE] (context: ActionContext<StoreStateType, StoreStateType>) {
            context.commit("shareQueue")
            
        }
    },
    modules: {
    }
})

export const key: InjectionKey<Store<StoreStateType>> = Symbol()

export const useStore = (): Store<StoreStateType> => {
    return baseUseStore(key)
}