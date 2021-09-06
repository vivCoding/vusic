<template>
    <h1>Song Queue</h1>
    <ul>
        <song-view v-for="song in queue" :key="song.videoId" :song="song" :queued="true"/>
    </ul>
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

