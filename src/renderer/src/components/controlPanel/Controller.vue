<template>
  <div class="clock__control">
    <PlayButton/>
    <SettingButton/>
  </div>
</template>

<script setup>
import PlayButton from "./PlayButton.vue";
import SettingButton from "./SettingButton.vue";
</script>

<style scoped>
.clock__control {
  display: flex;
  justify-content: center;
  align-items: center;
}

.clock__control::v-deep(.button_box) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.4s;
}

.clock__control::v-deep(.button_box:hover) {
  background-color: var(--hover-background-color);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
