<template>
    <div id = "queueView">
        <h1>Song Queue</h1>
        <div id="queueList">
            <h2 v-show="queue.length == 0">No songs in queue right now!</h2>
            <h2 v-show="queue.length == 0">Search for songs to start queueing.</h2>
            <song-view v-for="song in queue" :key="song.videoId" :song="song" :queued="true"/>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import SongView from './SongView.vue'

export default defineComponent({
    components: {
        SongView
    },

    setup() {
        const store = useStore()
        return {
            queue: computed(() => store.state.queue)
        }
    },
})
</script>

<style scoped>
#queueView {
    padding: 1em 5em;
    width: 60vw;
    height: 65vh;
}

#queueList {
    height: 90%;
    overflow-y: auto;
}
</style>
