<template>
  <div class="container">
    <component :is="timerComponent"/>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import themeStore from "../../store/ThemeStore";
import DefaultTimer from "./DefaultTimer.vue";

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
