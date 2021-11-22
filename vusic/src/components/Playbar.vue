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
        <h2 v-show="loadingSong">Loading song...</h2>
        <h2 v-show="error">Uh oh, something went wrong! Try again later</h2>
        <div id = "controls" v-show="!loadingSong && !error">
            <!-- loop current song -->
            <img class = "imgButton" :class = "{ buttonEnabled: audioLooping }" @click = "toggleLooping" src = "../assets/loop-white-18dp/2x/baseline_loop_white_18dp.png"/>
            <!-- previous song button -->
            <img class = "imgButton" @click="playPrevious" src = "../assets/skip_previous-white-18dp/2x/baseline_skip_previous_white_18dp.png"/>
            <!-- play and pause buttons -->
            <img class = "imgButton" @click="pauseAudio" v-if="audioPlaying" src = "../assets/pause_circle_outline-white-36dp/2x/baseline_pause_circle_outline_white_36dp.png"/>
            <img class = "imgButton" @click="resumeAudio" v-else src = "../assets/play_circle_outline-white-36dp/2x/baseline_play_circle_outline_white_36dp.png"/>
            <!-- next button (skip) -->
            <img class = "imgButton" @click="playNext" src = "../assets/skip_next-white-18dp/2x/baseline_skip_next_white_18dp.png"/>
            <!-- volume control -->
            <img class = "imgButton" @click="toggleMute" v-if = "!audioMuted" src = "../assets/volume_up-white-18dp/2x/baseline_volume_up_white_18dp.png"/>
            <img class = "imgButton" @click="toggleMute" v-else src = "../assets/volume_off-white-18dp/2x/baseline_volume_off_white_18dp.png"/>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref, watch } from 'vue'
// TODO: fix typing for howler.js https://github.com/goldfire/howler.js
import { SONG } from '@/store/actions'
import { Howl } from 'howler'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const store = useStore()
        const currentSong = computed(() => store.state.currentSong)

        let howler: any = undefined
        const loadingSong = ref(false)
        const error = ref(false)
        const audioPlaying = ref(false)

        let pausedSeek = 0

        let updateCurrentTimeLoop = 0
        const currentTime = ref(0)
        const duration = ref(0)

        const audioLooping = ref(false)
        const audioMuted = ref(false)

        watch(currentSong, () => {
            playAudio()
        })

        const playAudio = () => {
            stopAudio()
            if (currentSong.value?.videoId) {
                console.log(`${process.env.VUE_APP_API_URL}/playaudio?videoId=${currentSong.value.videoId}`)
                error.value = false
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
                    // TODO: fix onloaderror
                    // onloaderror: () => {
                    //     if (!loadingSuccess.value) {
                    //         console.log('bad')
                    //     }
                    // },
                    onplayerror: () => {
                        console.log('cant play song!')
                        error.value = true
                        loadingSong.value = false
                    },
                    onend: () => {
                        if (!audioLooping.value) {
                            audioPlaying.value = false
                            cancelUpdateCurrentTime()
                            playNext()
                        } else {
                            playAudio()
                        }
                    },
                })
                howler.play()
            } else {
                cancelUpdateCurrentTime()
                console.log('cant play song!')
                loadingSong.value = false
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
                howler = null
            }
            duration.value = 0
            audioPlaying.value = false
            pausedSeek = 0
            currentTime.value = 0
            cancelUpdateCurrentTime()
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
                currentTime.value = howler ? howler.seek() : 0
            }, 500)
        }

        const cancelUpdateCurrentTime = () => clearInterval(updateCurrentTimeLoop)

        const toggleMute = () => {
            audioMuted.value = !audioMuted.value
            if (howler) {
                howler.volume(audioMuted.value ? 0 : 1)
            }
        }

        const toggleLooping = () => {
            audioLooping.value = !audioLooping.value
        }

        const convertToMin = (time: number): string => {
            let min = Math.floor(time / 60);
            let sec = Math.floor(time - min * 60);
            return (min % 10 == min ? "0" + min : min) + ":" + (sec % 10 == sec ? "0" + sec : sec)
        }

        const route = useRoute()
        watch(
            () => route.path,
            () => {
                stopAudio()
                store.commit(SONG.SET_CURRENT, undefined)
            }
        )

        return {
            currentSong, loadingSong, error, audioPlaying, currentTime, duration,
            playAudio, stopAudio, pauseAudio, resumeAudio, seekAudio,
            playNext, playPrevious, convertToMin,
            audioMuted, toggleMute, audioLooping, toggleLooping
        }
    },
})
</script>

<style scoped>
#playbarContainer {
    width: 100%;
    text-align: center;
    padding: 0.75em 0;
    background-color: rgb(43, 43, 43);
    height: 15vh;
}

#controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#controls .imgButton {
    background: none;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    padding: 0.5em;
    margin: 0 0.5em 1em 0.5em;
}

#controls .imgButton:hover {
    opacity: 0.5;
}

#controls .buttonEnabled {
    background: rgb(124, 124, 124);
    border-radius: 5em;
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
