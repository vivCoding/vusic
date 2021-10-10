<template>
    <div id = "playbarContainer">
        <!-- <p>Current: {{ currentSong?.title }}</p> -->
        <div id = "audioTimeline">
            <h2 class = "timeLabel">{{ convertToMin(currentTime) }}</h2>
            <input id = "audioSlider" type = "range"
                :max = "duration"
                :value = "currentTime"
                @input="seekAudio"
                @change="resumeAudio"
            >
            <h2 class = "timeLabel">{{ convertToMin(duration) }}</h2>
        </div>
        <h3 v-show="loadingSong">loading...</h3>
        <div id = "controls" v-show="!loadingSong">
            <button @click="playPrevious">Previous</button>
            <button @click="audioPlaying ? pauseAudio() : resumeAudio()">
                <span v-if="audioPlaying">Pause</span>
                <span v-else>Resume</span>
            </button>
            <button @click="playNext">Next</button>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref, watch } from 'vue'
// TODO: fix typing for howler.js https://github.com/goldfire/howler.js
import { SONG } from '@/store/actions'
import { Howl } from 'howler'

export default defineComponent({
    setup() {
        const store = useStore()
        const currentSong = computed(() => store.state.currentSong)

        watch(currentSong, () => {
            playAudio()
        })

        let howler: any = undefined
        const loadingSong = ref(false)
        const audioPlaying = ref(false)

        let pausedSeek = 0

        let updateCurrentTimeLoop = 0
        const currentTime = ref(0)
        const duration = ref(0)

        const playAudio = () => {
            stopAudio()
            if (currentSong.value?.videoId) {
                console.log(`${process.env.VUE_APP_API_URL}/playaudio?videoId=${currentSong.value.videoId}`)
                loadingSong.value = true
                audioPlaying.value = false
                howler = new Howl({
                    src: `${process.env.VUE_APP_API_URL}/playaudio?videoId=${currentSong.value.videoId}`,
                    html5: true,
                    onload: () => {
                        loadingSong.value = false
                        audioPlaying.value = true
                        duration.value = howler.duration()
                        startUpdateCurrentTime()
                    },
                    // TODO: onloaderror
                    onend: () => {
                        audioPlaying.value = false
                        cancelUpdateCurrentTime()
                        playNext()
                    }
                })
                howler.play()
            } else {
                console.log('cant play song!')
            }
        }

        const pauseAudio = () => {
            if (howler && howler.playing()) {
                pausedSeek = howler.pause()
                audioPlaying.value = false
                cancelUpdateCurrentTime()
            }
        }

        const resumeAudio = () => {
            if (howler) {
                howler.seek(pausedSeek)
                howler.play()
                audioPlaying.value = true
                startUpdateCurrentTime()
            }
        }

        const stopAudio = () => {
            if (howler) {
                howler.stop()
                audioPlaying.value = false
                cancelUpdateCurrentTime()
                pausedSeek = 0
                currentTime.value = 0
                duration.value = 0
                howler = null
            }
        }

        const seekAudio = (e: Event) => {
            cancelUpdateCurrentTime()
            const newTime = parseFloat((e.target as HTMLInputElement).value)
            pausedSeek = newTime
            currentTime.value = newTime
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

        const startUpdateCurrentTime = () => {
            updateCurrentTimeLoop = setInterval(() => {
                currentTime.value = howler.seek()
            }, 500)
        }

        const cancelUpdateCurrentTime = () => clearInterval(updateCurrentTimeLoop)

        const convertToMin = (time: number): string => {
            let min = Math.floor(time / 60);
            let sec = Math.floor(time - min * 60);
            return (min % 10 == min ? "0" + min : min) + ":" + (sec % 10 == sec ? "0" + sec : sec)
        }

        return {
            currentSong, loadingSong, audioPlaying, currentTime, duration,
            playAudio, stopAudio, pauseAudio, resumeAudio, seekAudio,
            playNext, playPrevious, convertToMin
        }
    },
})
</script>

<style scoped>
#playbarContainer {
    width: 100%;
    text-align: center;
    padding: 2em 0;
    background-color: rgb(43, 43, 43);
}

#audioTimeline {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.timeLabel {
    padding: 0 1em;
}

#audioSlider {
    -webkit-appearance: none;
    width: 70%;
    height: 1em;
    background: #505050;
    outline: none;
    border-radius: 1em;
    cursor: pointer;
}

#audioSlider::-webkit-slider-runnable-track {
    background-color: blue;
}

#audioSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-transition: .25s;
    width: 1em;
    height: 1em;
    background: lime;
    border-radius: 1em;
    cursor: pointer;
    outline: none;
    transition: .25s;
}

#audioSlider::-webkit-slider-thumb:hover {
    width: 1em;
    height: 2.5em;
}

#audioSlider::-moz-range-thumb {
    -webkit-appearance: none;
    -webkit-transition: .25s;
    width: 1.2em;
    height: 1.2em;
    background: rgb(0, 158, 0);
    border: 0.3em solid rgb(0, 158, 0);
    border-radius: 1em;
    cursor: pointer;
    outline: none;
    transition: .25s;
}

#audioSlider::-moz-range-thumb:hover {
    width: 1.2em;
    height: 2.5em;
    border-radius: 1em;
}

#audioSlider::-moz-range-progress {
    background-color: rgb(0, 158, 0);
    height: 100%;
    border-radius: 1em 0 0 1em;
}

</style>
