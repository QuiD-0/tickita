<template>
  <div class="clock">
    <div class="numbers" ref="numbersRef"></div>
    <div v-if="timer.currentPhase.value !== 'longRest'" ref="remainRef" class="focus"></div>
    <div v-else class="longRest" ref="remainRef"></div>
    <div class="clock_hand" ref="minuteHandRef"></div>
    <div class="clock__center" ref="centerRef"></div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import useTimer from "../common/timer";

const remainRef = ref(null);
const minuteHandRef = ref(null);
const centerRef = ref(null);
const numbersRef = ref(null);
let timer = useTimer();

onMounted(() => {
  createNumbers();
  updateMinuteHand();
  setInterval(() => {
    updateMinuteHand();
  }, 1_000);
});

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
  if (!minuteHandRef.value || !centerRef.value || !remainRef.value) return;

  let totalDegree = timer.getRemainTime() / 60 * 6;
  let remainFocusDegree = timer.getRemainFocusTime() / 60 * 6;
  let remainRestDegree = timer.getRemainRestTime() / 60 * 6;
  let remainLongRestDegree = timer.getRemainLongRestTime() / 60 * 6;

  minuteHandRef.value.style.transform = `translate(-50%, -100%) rotate(${totalDegree}deg)`;
  centerRef.value.style.transform = `translate(-50%, -50%) rotate(${totalDegree + 45}deg)`;

  let currentFocus = remainRef.value.style.getPropertyValue("--focus-degree");
  let currentRest = remainRef.value.style.getPropertyValue("--rest-degree");

  if(timer.currentPhase.value === 'longRest') {
    let currentLongRest = remainRef.value.style.getPropertyValue("--long-rest-degree");
    if (currentLongRest !== `${remainLongRestDegree}deg`) {
      remainRef.value.style.setProperty("--long-rest-degree", `${remainLongRestDegree}deg`);
    }
  } else {
    if (currentFocus !== `${remainFocusDegree}deg`) {
      remainRef.value.style.setProperty("--focus-degree", `${remainFocusDegree}deg`);
    }
    if (currentRest !== `${remainRestDegree}deg`) {
      remainRef.value.style.setProperty("--rest-degree", `${remainRestDegree}deg`);
    }
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
  height: 100px;
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

@property --focus-degree {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --rest-degree {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --long-rest-degree {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.focus {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: --focus-degree 0.3s ease-in-out, --rest-degree 0.3s ease-in-out;
  background: conic-gradient(
    var(--rest-color) 0deg,
    var(--rest-color) var(--rest-degree),
    var(--focus-color) var(--rest-degree),
    var(--focus-color) calc(var(--rest-degree) + var(--focus-degree)),
    transparent calc(var(--rest-degree) + var(--focus-degree)),
    transparent 360deg
  );
}

.longRest {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: --long-rest-degree 0.3s ease-in-out;
  background: conic-gradient(
    var(--long-rest-color) 0deg,
    var(--long-rest-color) var(--long-rest-degree),
    transparent var(--long-rest-degree),
    transparent 360deg
  );
}

.font1 {
  font-size: calc(0.5rem + 2vmin);
  font-weight: 700;
}
</style>
