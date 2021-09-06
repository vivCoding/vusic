<template>
    <div class = "song" @click="handleFullDivClick">
        <img :src="song.thumbnail"/>
        <span>{{ song?.queueIndex }}</span>&nbsp;
        <span v-html="song.title"/>&nbsp;
        <button v-show="!queued" @click="addToQueue">+</button>
        <span v-show="queued">
            <button @click="moveUpQueue">↑</button>
            <button @click="moveDownQueue">↓</button>
            <button @click="removeFromQueue">x</button>
        </span>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { QUEUE, SONG } from '@/store/actions'
import { QueuedSong, Song } from '@/types/song'
import { SongPayload } from '@/types/store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        song: {
            type: Object as PropType<Song | QueuedSong>,
            required: true
        },
        queued: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    setup(props) {
        const store = useStore()

        const handleFullDivClick = (e: Event) => {
            const target = e.target as HTMLInputElement
            if (e.stopPropagation) e.stopPropagation()
            if (target.nodeName != 'BUTTON') {
                setAsCurrentSong()
            }
        }

        const addToQueue = () => {
            store.commit(QUEUE.ADD_SONG, { song: props.song } as SongPayload)
        }

        const setAsCurrentSong = () => {
            if (props.queued) {
                store.commit(SONG.SET_CURRENT, { song: props.song } as SongPayload)
            }
        }

        const moveUpQueue = () => {
            store.commit(QUEUE.MOVE_SONG_UP, { song: props.song } as SongPayload)
        }

        const moveDownQueue = () => {
            store.commit(QUEUE.MOVE_SONG_DOWN, { song: props.song } as SongPayload)
        }

        const removeFromQueue = () => {
            store.commit(QUEUE.REMOVE_SONG, { song: props.song } as SongPayload)
        }

        return {
            handleFullDivClick, addToQueue, setAsCurrentSong, moveUpQueue, moveDownQueue, removeFromQueue
        }
    },
})
</script>

<style scoped>
.song:hover {
    cursor: pointer;
}
</style>