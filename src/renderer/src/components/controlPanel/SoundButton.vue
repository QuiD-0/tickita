<template>
  <div class="button_box" id="sound_mode" @click="popUp">
    <font-awesome-icon icon="fa-solid fa-volume-high"/>
    <div id="popUp" class="popup_window" @mouseleave="hidePopupAfterDelay" @click.stop>
      <div class="divider">
        <input type="range" name="range" :value="clock_volume" min="0" max="100" orient="vertical" id="inputRange1"
               class="inputRange" @input="changeClockVolume"/>
        <font-awesome-icon icon="fa-solid fa-wave-square" class ='icon-on-slider'/>

      </div>
      <div class="divider">
        <input type="range" name="range" :value="beep_volume" min="0" max="100" orient="vertical" id="inputRange2"
               class="inputRange" @input="changeBeepVolume"/>
        <font-awesome-icon icon="fa-solid fa-bell" class ='icon-on-slider'/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, watch} from "vue";
import SoundStore from "../../store/SoundStore";

const clock_volume = computed(() => SoundStore.getters.clockVolume)
const changeClockVolume = (event) => {
  SoundStore.commit('setClockVolume', event.target.value)
}

const beep_volume = computed(() => SoundStore.getters.beepVolume)
const changeBeepVolume = (event) => {
  SoundStore.commit('setBeepVolume', event.target.value)
}

const popUp = () => {
  let popUp = document.getElementById('popUp')
  if (popUp.style.display === 'none' || popUp.style.display === '') {
    popUp.style.display = 'flex'
  } else {
    popUp.style.display = 'none'
  }
}

const hidePopupAfterDelay = () => {
  setTimeout(() => {
    let popUp = document.getElementById('popUp')
    popUp.style.display = 'none'
  }, 500)
}

watch(clock_volume, (_) => {
  const inputRange1 = document.getElementById("inputRange1");
  const ratio = (inputRange1.value - inputRange1.min) / (inputRange1.max - inputRange1.min) * 100;
  inputRange1.style.background = `linear-gradient(0deg, var(--text-color) ${ratio}%, var(--hover-background-color) ${ratio}%)`;
})

watch(beep_volume, (_) => {
  const inputRange2 = document.getElementById("inputRange2");
  const ratio = (inputRange2.value - inputRange2.min) / (inputRange2.max - inputRange2.min) * 100;
  inputRange2.style.background = `linear-gradient(0deg, var(--text-color) ${ratio}%, var(--hover-background-color) ${ratio}%)`;
})

onMounted(() => {
  const inputRange1 = document.getElementById("inputRange1");
  const ratio1 = (inputRange1.value - inputRange1.min) / (inputRange1.max - inputRange1.min) * 100;
  inputRange1.style.background = `linear-gradient(0deg, var(--text-color) ${ratio1}%, var(--hover-background-color) ${ratio1}%)`;

  const inputRange2 = document.getElementById("inputRange2");
  const ratio2 = (inputRange2.value - inputRange2.min) / (inputRange2.max - inputRange2.min) * 100;
  inputRange2.style.background = `linear-gradient(0deg, var(--text-color) ${ratio2}%, var(--hover-background-color) ${ratio2}%)`;
})
</script>

<style scoped>
.button_box {
  position: relative;
}

.popup_window {
  display: none;
  position: absolute;
  top: -150px;
  justify-content: space-around;
  width: 110px;
  flex-direction: row;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 15px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.inputRange {
  appearance: none;
  width: 35px;
  height: 120px;
  border-radius: 9px;
  writing-mode: vertical-rl;
  direction: rtl;
  cursor: pointer;
}

.inputRange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 33px;
  height: 0;
  border-radius: 50px;
  background: var(--hover-background-color);
  box-shadow: none;
}

.inputRange::-moz-range-thumb {
  border: none;
  width: 33px;
  height: 0;
  border-radius: 50px;
  background: var(--hover-background-color);
  box-shadow: none;
}

.divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
}

.icon-on-slider {
  pointer-events: none;
  position: relative;
  top: -25px;
  color: var(--background-color);
}

</style>
