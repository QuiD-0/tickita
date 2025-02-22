<template>
  <div class="clock__control">
    <div id="play">
      <PlayButton/>
    </div>
    <div id="not_play">
      <DarkModeButton/>
      <SoundButton/>
      <SettingButton/>
    </div>
  </div>
</template>

<script setup>
import PlayButton from "./PlayButton.vue";
import SettingButton from "./SettingButton.vue";
import DarkModeButton from "./DarkModeButton.vue";
import SoundButton from "./SoundButton.vue";
</script>

<style scoped>
.clock__control,
.clock__control div {
  display: flex;
  justify-content: center;
  align-items: center;
}

#play::v-deep(.button_box),
#not_play::v-deep(.button_box) {
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

#play::v-deep(.button_box:hover),
#not_play::v-deep(.button_box:hover) {
  background-color: var(--hover-background-color);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
