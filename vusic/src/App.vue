<template>
    <Navbar/>
    <router-view/>
    <Footer/>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from './store';
import { PLAYLIST } from './store/actions';
import { PlaylistPayload } from './types/store';

export default defineComponent({
    name: 'App',
    components: {
        Navbar, Footer
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        watch(
            () => route.params.playlistId,
            newPlaylistId => {
                store.dispatch(PLAYLIST.GET, {
                    playlistId: newPlaylistId
                } as PlaylistPayload)
            }
        )

        watch(
            () => store.state.net.fetchError,
            fetchError => {
                if (fetchError) {
                    router.push('/error')
                }
            }
        )
    }
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
</style>
