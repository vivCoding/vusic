<template>
    <div id = "navbar">
        <router-link to="/"><img id="logo" alt="vusic logo" src="../assets/logo.png"></router-link>
        <div>
            <h1 id = "title">Vusic</h1>
            <h3 id = "subtitle">A Fast and Easy-to-Use Music Queuer</h3>
        </div>
        <div id = "sharingDiv">
            <button v-show="!saved && !saving" @click="saveQueue">Save Queue</button>
            <h2 v-show="saving && !saved">Saving...</h2>
            <h2 v-show="!saving && saved">Your Playlist ID is: abcdefg</h2>
            <button @click="shareQueue">Share Queue</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const saved = ref(false)
        const saving = ref(false)

        const saveQueue = () => {
            saved.value = true
            saving.value = true
        }

        const shareQueue = () => {
            saved.value = false
            return
        }

        return {
            saved, saving, saveQueue, shareQueue
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
    display: inline-block;
}
</style>