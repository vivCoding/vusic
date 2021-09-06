<template>
    <h1>Search</h1>
    <input id = "searchInput" size=30 placeholder="Enter a song name, and start queuing!" v-model="query"/>&nbsp;
    <button @click="handleSearch">Search</button>
    <h3>Results</h3>
    <ul>
        <song-view v-for="result in results" :key="result.id" :song="result"/>
    </ul>
</template>

<script lang="ts">
import { Song } from '@/types/song'
import { defineComponent, ref } from 'vue'
import { searchSongs } from '../api'
import SongView from './SongView.vue'

export default defineComponent({
    components: {
        SongView
    },

    setup() {
        const query = ref('')
        const results = ref([] as Song[])
        const handleSearch = () => {
            searchSongs(query.value).then(result => {
                if (result.success && result.data) {
                    results.value = result.data
                }
            })
        }
        return {
            query, handleSearch, results
        }
    },
})
</script>

<style scoped>
input {
    padding: 0.5em;
}
</style>