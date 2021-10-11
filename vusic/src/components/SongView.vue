<template>
    <div id = "songContainer" :class = "{ currentPlaying: isCurrentSong }" @click="handleFullDivClick">
        <h2 id = "queueId" v-show="queued">{{ song.queueId + 1 }}</h2>
        <img :src="song.thumbnail"/>
        <h2 id = "songTitle" v-html="song.title"/>&nbsp;
        <div id = "songButtons">
            <div v-if="!queued">
                <img class = "imgButton" @click="addToQueue" src = "../assets/queue-white-18dp/2x/baseline_queue_white_18dp.png"/>
            </div>
            <div v-else>
                <img class = "imgButton" @click="moveUpQueue" src = "../assets/arrow_upward-white-18dp/2x/baseline_arrow_upward_white_18dp.png"/>
                <img class = "imgButton" @click="moveDownQueue" src = "../assets/arrow_downward-white-18dp/2x/baseline_arrow_downward_white_18dp.png"/>
                <img class = "imgButton" @click="removeFromQueue" src = "../assets/close-white-18dp/2x/baseline_close_white_18dp.png"/>
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
            return props.queued && (props.song as QueuedSong).queueId == store.state.currentSong?.queueId
        })


        const handleFullDivClick = (e: Event) => {
            const target = e.target as HTMLInputElement
            if (e.stopPropagation) e.stopPropagation()
            if (target.nodeName != 'BUTTON' && target.className != "imgButton") {
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
    padding: 0em 2em 0 0;
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

#queueId {
    padding-left: 1em;
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

#songButtons .imgButton {
    color: white;
    background: none;
    border: none;
    border-radius: 5em;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 2.5em;
    margin: 0;
    padding: 1.5em;
}

#songButtons .imgButton:hover {
    background-color: lightslategray;
}
</style>