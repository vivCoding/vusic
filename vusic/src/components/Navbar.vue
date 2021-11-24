<template>
    <div id = "navbar">
        <router-link to="/"><img id="logo" alt="vusic logo" src="../assets/logo.png"></router-link>
        <div>
            <h1 id = "title">Vusic</h1>
            <h3 id = "subtitle">A Fast and Easy-to-Use Music Queuer</h3>
        </div>
        <div id = "sharingDiv">
            <h2 v-show="!saving && playlistId">Your Playlist ID is: {{ playlistId }}</h2>
            <h2 v-show="saving">Saving...</h2>
            <button v-show="playlistId" @click="shareQueue">Share</button>
            <button v-show="!saving" @click="saveQueue">Save Queue</button>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { PLAYLIST } from '@/store/actions'
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const store = useStore()
        const route = useRoute()
        const playlistId = ref()

        watch (
            () => store.state.playlistId,
            newPlaylistId => playlistId.value = newPlaylistId
        )

        const saving = ref(false)
        const saveQueue = () => store.dispatch(PLAYLIST.SAVE)

        watch (
            () => store.state.net.saving,
            newSaving => saving.value = newSaving
        )

        const shareQueue = () => {
            let url = window.location.href
            if (!route.params.playlistId) {
                url += `${playlistId.value}`
            }
            navigator.clipboard.writeText(url).then(() => {
                alert('Copied song queue and playlist URL to clipboard!')
            })
        }

        return {
            saving, saveQueue, shareQueue, playlistId
        }
    },
})
</script>

<style scoped>
#navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #2e2e2e;
    padding: 0 2em;
}

#logo {
    width: 7em;
    padding: 0 1em;
}

#title {
    margin: 0;
    font-weight: 1000;
}

#subtitle {
    margin: 0
}

#sharingDiv {
    margin-left: auto;
    margin-right: 5em;
}

#sharingDiv button {
    margin-left: 1.5em;
    background-color: rgb(0, 153, 255);
    color: white;
    border: none;
    border-radius: 0.5em;
    padding: 0.75em;
    font-size: 150%;
    font-family: monospace;
    font-weight: bolder;
    cursor: pointer;
}

#sharingDiv button:hover {
    opacity: 0.7;
}

#sharingDiv h2 {
    display: inline;
}
</style>