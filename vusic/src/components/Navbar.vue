<template>
    <div id = "navbar">
        <router-link to="/"><img id="logo" alt="vusic logo" src="../assets/logo.png"></router-link>
        <div>
            <h1 id = "title">Vusic</h1>
            <h3 id = "subtitle">A Fast and Easy-to-Use Music Queuer</h3>
        </div>
        <div id = "sharingDiv">
            <button v-show="!shared" @click="shareQueue">Share Queue</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const shared = ref(false)

        const shareQueue = () => {
            shared.value = true
        }

        return {
            shared, shareQueue
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
</style>