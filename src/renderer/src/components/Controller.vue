<template>
  <div class="clock__control">
    <div v-if="isRunning" @click="pauseTimer" class="button_box">
      <div v-if="isPaused" id="pause-play">
        <font-awesome-icon icon="fa-solid fa-play"/>
      </div>
      <div v-else id="pause-pause">
        <font-awesome-icon icon="fa-solid fa-pause"/>
      </div>
    </div>
    <div v-if="isRunning" id="stop" @click="stopTimer" class="button_box">
      <font-awesome-icon icon="fa-solid fa-stop"/>
    </div>
    <div v-else @click="startTimer" id="start" class="button_box">
      <font-awesome-icon icon="fa-solid fa-play"/>
    </div>
    <div class="button_box" id="settings">
      <font-awesome-icon icon="fa-solid fa-cog"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue'
import ControllerStore from "../store/ControllerStore";

const isRunning = computed(() => {
  return ControllerStore.getters.isRunning
})
const isPaused = computed(() => {
  return ControllerStore.getters.isPaused
})

function startTimer() {
  const start = document.getElementById('start')
  const settings = document.getElementById('settings')
  const pause = document.getElementById('pause-pause')
  const stop = document.getElementById('stop')

  start.style.transform = 'translateX(-30px)'
  start.style.opacity = '0'
  settings.style.transition = 'all 0.4s'
  settings.style.transform = 'translateX(30px)'
  setTimeout(() => {
    settings.style.transition = 'none'
    settings.style.transform = 'translateX(0px)'
    settings.style.opacity = '1'
    ControllerStore.commit('start')
  }, 400)
  pause.style.opacity = '1'
  stop.style.opacity = '1'
}

function pauseTimer() {
  ControllerStore.commit('pause')
}

function stopTimer() {
  const start = document.getElementById('start')
  const settings = document.getElementById('settings')
  const pause = document.getElementById('pause-pause')
  const pausePlay = document.getElementById('pause-play')
  const stop = document.getElementById('stop')

  settings.style.transition = 'all 0.4s'
  settings.style.transform = 'translateX(-30px)'
  if (pause) {
    pause.style.transition = 'all 0.4s'
    pause.style.transform = 'translateX(30px)'
    pause.style.opacity = '0'
  }
  if (pausePlay) {
    pausePlay.style.transition = 'all 0.4s'
    pausePlay.style.transform = 'translateX(30px)'
  }
  stop.style.transition = 'all 0.4s'
  stop.style.opacity = '0'
  setTimeout(() => {
    settings.style.transition = 'none'
    settings.style.transform = 'translateX(0px)'
    ControllerStore.commit('stop')
  }, 400)
  start.style.opacity = '1'
}
</script>

<style scoped>
.clock__control {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.4s;
}

.button_box:hover {
  background-color: #d5d5d5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

</style>
