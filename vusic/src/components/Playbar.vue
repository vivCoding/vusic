<template>
    <h1>Playing</h1>
    <p>Current: {{ currentSong?.title }}</p>
    <button @click="playAudio">Play</button>
    <button @click="pauseAudio">Pause</button>
    <button @click="resumeAudio">Resume</button>
    <button @click="stopAudio">Stop</button>
    <br>
    <button @click="playPrevious">Previous</button>
    <button @click="playNext">Next</button>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, watch } from 'vue'
// TODO: fix typing for howler.js https://github.com/goldfire/howler.js
import { Howl } from 'howler'
import { SONG } from '@/store/actions'

export default defineComponent({
    setup() {
        const store = useStore()
        const currentSong = computed(() => store.state.currentSong)

        watch(currentSong, () => {
            playAudio()
        })

        let howler: any = undefined
        let currentSeek = 0

        const playAudio = () => {
            stopAudio()
            if (currentSong.value?.videoId) {
                console.log(`${process.env.VUE_APP_API_URL}/playaudio?videoId=${currentSong.value.videoId}`)
                howler = new Howl({
                    src: `${process.env.VUE_APP_API_URL}/playaudio?videoId=${currentSong.value.videoId}`,
                    html5: true,
                    onend: () => {
                        playNext()
                    }
                })
                howler.play()
            } else {
                console.log('cant play song!')
            }
        }

        const pauseAudio = () => {
            if (howler.playing()) {
                currentSeek = howler.pause()
            }
        }

        const resumeAudio = () => {
            if (!howler.playing()) {
                howler.seek(currentSeek)
                howler.play()
            }
        }

        const stopAudio = () => {
            if (howler) {
                howler.stop()
            }
        }

        const playNext = () => {
            stopAudio()
            store.commit(SONG.NEXT)
            playAudio()
        }

        const playPrevious = () => {
            stopAudio()
            store.commit(SONG.PREVIOUS)
            playAudio()
        }

        return {
            currentSong, playAudio, stopAudio, pauseAudio, resumeAudio,
            playNext, playPrevious
        }
    },
})
</script>
