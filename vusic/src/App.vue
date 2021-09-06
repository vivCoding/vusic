<template>
    <img alt="Vue logo" src="./assets/logo.png" width=100>
    <queue-view/>
    <search-view/>
    <playbar/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Playbar from './components/Playbar.vue';
import QueueView from './components/QueueView.vue'
import SearchView from './components/SearchView.vue'

export default defineComponent({
    name: 'App',
    components: {
        QueueView, SearchView, Playbar
    },
});
</script>

<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: black;
    color: white;
    padding: 2em;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
}
</style>
