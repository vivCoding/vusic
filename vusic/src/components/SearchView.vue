<template>
    <div id = "searchView">
        <h1>Search</h1>
        <input id = "searchInput" size=30 placeholder="Enter a song name, and start queuing!" v-model="query"/>&nbsp;
        <button @click="handleSearch">Search</button>
        <h1>Results</h1>
        <div id = "resultsList">
            <song-view v-for="result in results" :key="result.id" :song="result"/>
        </div>
    </div>
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
#searchView {
    padding: 1em 3em;
    border-left: 0.2em lightgrey solid;
    width: 40vw;
}
input {
    padding: 0.5em;
    height: 2em;
}

#resultsList {
    height: 90%;
    overflow-y: auto;
}
</style>