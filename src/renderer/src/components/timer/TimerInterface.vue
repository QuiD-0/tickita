<template>
  <div class="container">
    <component :is="timerComponent"/>
  </div>
</template>

<script setup>
import {computed, watch} from 'vue'
import themeStore from "../../store/ThemeStore";
import AnalogTimer from "./AnalogTimer.vue";
import DefaultTimer from "./DefaultTimer.vue";
import SoundStore from "../../store/SoundStore";
import ControllerStore from "../../store/ControllerStore";

const timerComponent = computed(() => {
  return timerSelector(themeStore.state.theme);
});

function timerSelector(theme) {
  switch (theme) {
    // case 'analog':
    //   return AnalogTimer
    default:
      return DefaultTimer
  }
}

const runningState = computed(() => ControllerStore.getters.runningState)
const clockVolume = computed(() => SoundStore.getters.clockVolume)
const beepVolume = computed(() => SoundStore.getters.beepVolume)

const clock = new Audio('src/assets/white-noise.mp3')
clock.loop = true
clock.volume = clockVolume.value / 100

const beep = new Audio('src/assets/alarm-beep.mp3')
beep.volume = beepVolume.value / 100

watch(runningState, (value) => {
  switch (value) {
    case 'focus':
      clock.play()
      break
    case 'rest':
      clock.pause()
      break
    case 'finish':
      clock.pause()
      beep.play()
      break
    default:
      clock.pause()
  }
})

watch(clockVolume, (value) => {
  clock.volume = value / 100
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 75vh;
}
</style>
