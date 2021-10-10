<template>
    <div id = "songContainer" :class = "{ currentPlaying: isCurrentSong }" @click="handleFullDivClick">
        <h2>{{ song?.queueIndex }}</h2>
        <img :src="song.thumbnail"/>
        <h2 id = "songTitle" v-html="song.title"/>&nbsp;
        <div id = "songButtons">
            <div v-if="!queued">
                <button @click="addToQueue">+</button>
            </div>
            <div v-else>
                <button @click="moveUpQueue">↑</button>
                <button @click="moveDownQueue">↓</button>
                <button @click="removeFromQueue">x</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { QUEUE, SONG } from '@/store/actions'
import { QueuedSong, Song } from '@/types/song'
import { SongPayload } from '@/types/store'
import { computed, defineComponent, PropType } from 'vue'

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
        const isCurrentSong = computed(() => {
            return (props.song as QueuedSong).queueIndex == store.state.currentSong?.queueIndex
        })


        const handleFullDivClick = (e: Event) => {
            const target = e.target as HTMLInputElement
            if (e.stopPropagation) e.stopPropagation()
            if (target.nodeName != 'BUTTON') {
                if (props.queued) {
                    setAsCurrentSong()
                } else {
                    addToQueue()
                }
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
            handleFullDivClick, addToQueue, setAsCurrentSong, moveUpQueue, moveDownQueue, removeFromQueue, isCurrentSong
        }
    },
})
</script>

<style scoped>
#songContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0em 2em;
    border-radius: 2em;
    transition: background-color 0.1s;
}

#songContainer:hover {
    cursor: pointer;
    background-color: rgb(68, 78, 78);
}

.currentPlaying {
    background-color: green;
}

#songContainer img {
    padding: 2em;
    width: 15em;
}

#songTitle {
    /* padding: 0.75em;
    padding-left: 1.1em; */
    width: 100%;
}

#songButtons div {
    display: flex;
    flex-direction: row;
    padding-right: 1.1em;
}

#songButtons button {
    color: white;
    background: none;
    border: none;
    padding: 1.25em;
    margin: 0.1em;
    border-radius: 5em;
    cursor: pointer;
    transition: background-color 0.2s;
}

#songButtons button:hover {
    background-color: lightslategray;
}
</style>