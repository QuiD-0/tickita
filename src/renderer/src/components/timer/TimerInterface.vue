<template>
  <component :is="timerComponent" />
</template>

<script setup>
import { computed } from 'vue'
import themeStore from "../../store/ThemeStore";
import AnalogTimer from "./AnalogTimer.vue";
import DefaultTimer from "./DefaultTimer.vue";

const timerComponent = computed(() => {
  return timerSelector(themeStore.state.theme);
});

function timerSelector(theme) {
  switch (theme) {
    case 'analog':
      return AnalogTimer
    default:
      return DefaultTimer
  }
}
</script>
