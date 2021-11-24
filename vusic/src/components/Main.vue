<template>
    <div id = "main">
        <QueueView/>
        <SearchView/>
    </div>
    <Playbar/>
</template>

<script lang="ts">
import Playbar from './Playbar.vue'
import QueueView from './QueueView.vue'
import SearchView from './SearchView.vue'

export default {
    components: {
        QueueView, SearchView, Playbar
    },
}
</script>

<style scoped>
#main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em 0;
}
</style>