<template>
    <div id = "searchView">
        <div id = "queryAndTitle">
            <h1>Search</h1>
            <input id = "searchInput" type=textarea resize=none size=30 placeholder="Enter a song name, and start queuing!" v-model="query"/>&nbsp;
            <h1>Results</h1>
            <h3 v-show = "searching" class = "statusMessage">Searching...</h3>
            <h3 v-show = "loadingResults" class = "statusMessage">Loading results...</h3>
        </div>
        <div id = "resultsList">
            <h3 v-show = "error" class = "statusMessage">Service is currently down right now. Please try again later!</h3>
            <song-view v-for="result in results" :key="result.id" :song="result"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Song } from '@/types/song'
import { defineComponent, ref, watch } from 'vue'
import { searchSongs } from '../api'
import SongView from './SongView.vue'

export default defineComponent({
    components: {
        SongView
    },

    setup() {
        const query = ref('')
        const results = ref([] as Song[])
        
        const searching = ref(false)
        const loadingResults = ref(false)
        const error = ref(false)

        const handleSearch = () => {
            searching.value = false
            error.value = false
            if (query.value != '') {
                loadingResults.value = true
                searchSongs(query.value).then(result => {
                    if (result.success && result.data) {
                        results.value = result.data
                        loadingResults.value = false
                    }
                }).catch(() => {
                    error.value = true
                    results.value = []
                    loadingResults.value = false
                })
            }
        }

        let searchingTimeout = 0
        watch(query, () => {
            searching.value = true
            error.value = false
            clearTimeout(searchingTimeout)
            searchingTimeout = setTimeout(handleSearch, 1250)
        })

        return {
            query, handleSearch, results, searching, loadingResults, error
        }
    },
})
</script>

<style scoped>
#searchView {
    padding: 1em 5em;
    border-left: 0.2em lightgrey solid;
    width: 40vw;
    height: 65vh;
}

input {
    padding: 0.25em 1em;
    height: 2em;
    width: 60%;
    border-radius: 0.75em;
    font-family: monospace;
    font-size: 120%;
    background-color: rgb(87, 87, 87);
    color: white;
    border: rgb(119, 119, 119) solid;
    outline: none;
}

#resultsList {
    height: 70%;
    overflow-y: auto;
}
</style>