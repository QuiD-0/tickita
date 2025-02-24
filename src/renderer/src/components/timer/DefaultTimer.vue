<template>
  <div class="clock">
    <div class="clock__center" ref="centerRef"></div>
    <div class="clock_hand" ref="minuteHandRef"></div>
    <div class="numbers" ref="numbersRef"></div>
    <div class="remain" ref="remainRef"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue";
import ControllerStore from "../../store/ControllerStore";
import SettingStore from "../../store/SettingStore";
import useSound from "../common/sound";

const sound = useSound()
const remainRef = ref(null);
const minuteHandRef = ref(null);
const centerRef = ref(null);
const numbersRef = ref(null);
const settingFocusTime = computed(() => SettingStore.getters.focusTime);
const settingShortBreakTime = computed(() => SettingStore.getters.restTime);
const settingLongBreakTime = computed(() => SettingStore.getters.longRestTime);
const settingInterval = computed(() => SettingStore.getters.interval);

let remainFocus = ref(SettingStore.getters.focusTime);
let remainRest = ref(SettingStore.getters.restTime);
let remainLongRest = ref(SettingStore.getters.longRestTime);
let remainInterval = ref(SettingStore.getters.interval);
const SECONDS = 60;

const runningState = computed(() => ControllerStore.getters.runningState);
const currentPhase = ref("focus");

onMounted(() => {
  createNumbers();
  updateMinuteHand();
  setInterval(() => {
    updateRemainTime();
    updateMinuteHand();
    updateCurrentPhase();
  }, 1_000);
});

watch([settingFocusTime, settingShortBreakTime, settingLongBreakTime, settingInterval], () => {
  remainFocus.value = settingFocusTime.value;
  remainRest.value = settingShortBreakTime.value;
  remainLongRest.value = settingLongBreakTime.value;
  remainInterval.value = settingInterval.value;
  ControllerStore.commit("stop");
});

watch(runningState, (state) => {
  if (state === "init") {
    remainFocus.value = settingFocusTime.value;
    remainRest.value = settingShortBreakTime.value;
    remainLongRest.value = settingLongBreakTime.value;
    remainInterval.value = settingInterval.value;
  }
});

watch(currentPhase, (value, oldValue, _) => {
  console.log(oldValue, value);
  if(oldValue === "focus" && value === "rest") {
    sound.playBeep();
  }
  if(oldValue === "rest" && value === "focus") {
    sound.playBeep();
  }
  if(oldValue === "longRest" && value === "focus") {
    sound.playBeep();
  }
})

function createNumbers() {
  if (!numbersRef.value) return;
  numbersRef.value.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) - 90;
    const x = 50 + 43 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 43 * Math.sin(angle * Math.PI / 180);

    const span = document.createElement("span");
    span.innerText = String(i * 5)
    span.style.position = "absolute";
    span.style.left = `${x}%`;
    span.style.top = `${y}%`;
    span.style.transform = "translate(-50%, -50%)";
    span.classList.add("font1");

    numbersRef.value.appendChild(span);
  }
}

function updateMinuteHand() {
  if (!minuteHandRef.value || !centerRef.value) return;

  let degrees = getDegrees();

  minuteHandRef.value.style.transform = `translate(-50%, -100%) rotate(${degrees}deg)`;
  centerRef.value.style.transform = `translate(-50%, -50%) rotate(${degrees + 45}deg)`;
}

function getDegrees() {
  let degrees;
  if (currentPhase.value === "longRest") {
    degrees = remainLongRest.value / 60 * 6;
  } else {
    degrees = (remainFocus.value / 60) * 6 + (remainRest.value / 60) * 6;
  }
  return degrees;
}

function updateRemainTime() {
  if (runningState.value !== "play") return

  switch (currentPhase.value) {
    case "focus":
      remainFocus.value -= SECONDS;
      if (remainFocus.value <= 0) remainFocus.value = 0;
      break;
    case "rest":
      remainRest.value -= SECONDS;
      if (remainRest.value <= 0) remainRest.value = 0;
      break;
    case "longRest":
      remainLongRest.value -= SECONDS;
      if (remainLongRest.value <= 0) remainLongRest.value = 0;
      break;
  }
}

function updateCurrentPhase() {
  if (runningState.value !== "play") return

  let focus = remainFocus.value;
  let rest = remainRest.value;
  let longRest = remainLongRest.value;
  let interval = remainInterval.value;

  if(focus !== 0 && rest !== 0 && longRest !== 0) {
    currentPhase.value = "focus";
  }

  if(focus === 0 && rest !== 0 && longRest !== 0) {
    currentPhase.value = "rest";
  }

  if(focus === 0 && rest === 0 && interval > 0 && longRest !== 0) {
    remainInterval.value -= 1;
    if(remainInterval.value === 0) {
      currentPhase.value = "longRest";
    } else {
      currentPhase.value = "focus";
      remainFocus.value = settingFocusTime.value;
      remainRest.value = settingShortBreakTime.value;
    }
  }

  if(focus === 0 && rest === 0 && interval === 0 && longRest === 0) {
    currentPhase.value = "focus";
    ControllerStore.commit("stop");
  }
}
</script>

<style scoped>
.clock {
  width: 70vh;
  height: 70vh;
  border-radius: 50%;
  background-color: var(--background-color);
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.clock__center {
  width: 20px;
  height: 20px;
  background-color: var(--text-color);
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 0 50% 50% 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease-in-out;
}

.clock_hand {
  width: 3px;
  height: 35%;
  background-color: var(--text-color);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: translate(-50%, -100%) rotate(45deg);
  transition: transform 0.3s ease-in-out;
}

.numbers {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font1 {
  font-size: calc(0.5rem + 2vmin);
  font-weight: 700;
}
</style>
