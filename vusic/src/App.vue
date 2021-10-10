<template>
    <navbar/>
    <div id = "main">
        <queue-view/>
        <search-view/>
    </div>
    <playbar/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue'
import Playbar from './components/Playbar.vue';
import QueueView from './components/QueueView.vue'
import SearchView from './components/SearchView.vue'

export default defineComponent({
    name: 'App',
    components: {
        QueueView, SearchView, Playbar, Navbar
    },
});
</script>

<style>
body {
    font-family: monospace;
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
}

#main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 65vh;
    margin: 2em 0;
}
</style>
