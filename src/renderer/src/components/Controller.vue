<template>
  <div class="clock__control">
    <div v-if="isRunning" @click="pause" class="button_box">
      <div v-if="isPaused">
        <font-awesome-icon icon="fa-solid fa-play"/>
      </div>
      <div v-else>
        <font-awesome-icon icon="fa-solid fa-pause"/>
      </div>
    </div>
    <div v-if="isRunning" @click="stop" class="button_box">
      <font-awesome-icon icon="fa-solid fa-stop"/>
    </div>
    <div v-else @click="start" class="button_box">
      <font-awesome-icon icon="fa-solid fa-play"/>
    </div>
    <div class="button_box">
      <font-awesome-icon icon="fa-solid fa-cog"/>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import ControllerStore from "../store/ControllerStore";

const isRunning = computed(() => {
  return ControllerStore.getters.isRunning
})
const isPaused = computed(() => {
  return ControllerStore.getters.isPaused
})

function start() {
  ControllerStore.commit('start')
}

function pause() {
  ControllerStore.commit('pause')
}

function stop() {
  ControllerStore.commit('stop')
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
