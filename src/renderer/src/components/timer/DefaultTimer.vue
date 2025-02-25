<template>
  <div class="clock_container">
    <div class="clock">
      <div class="numbers" ref="numbersRef"></div>
      <div v-show="timer.currentPhase.value !== 'longRest'" ref="focusRef" class="focus"></div>
      <div v-show="timer.currentPhase.value === 'longRest'" ref="longRestRef" class="longRest"></div>
      <div class="clock_hand" ref="minuteHandRef"></div>
      <div class="clock__center" ref="centerRef"></div>
      <div class="clock_end" ref="endRef"></div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import useTimer from "../common/timer";

const focusRef = ref(null);
const longRestRef = ref(null);
const minuteHandRef = ref(null);
const centerRef = ref(null);
const numbersRef = ref(null);
const endRef = ref(null);
let timer = useTimer();

onMounted(() => {
  createClock();
  updateMinuteHand();
  setInterval(() => {
    updateMinuteHand();
  }, 1_000);
});

function createClock() {
  if (!numbersRef.value || !endRef.value) return;
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

    const nx = 50 + 34.5 * Math.cos(angle * Math.PI / 180);
    const ny = 50 + 34.5 * Math.sin(angle * Math.PI / 180);
    const degree = angle + 90;

    const end = document.createElement("div");
    end.style.position = "absolute";
    end.style.width = "2px";
    end.style.height = "7px";
    end.style.backgroundColor = "var(--text-color)";
    end.style.left = `${nx}%`;
    end.style.top = `${ny}%`;
    end.style.transform = `translate(-50%, -50%) rotate(${degree}deg)`;

    endRef.value.appendChild(end);
  }
}

function updateMinuteHand() {
  if (!minuteHandRef.value || !centerRef.value || !focusRef.value || !longRestRef.value) return;

  let totalDegree = timer.getRemainTime() / 60 * 6;
  let remainFocusDegree = timer.getRemainFocusTime() / 60 * 6;
  let remainRestDegree = timer.getRemainRestTime() / 60 * 6;
  let remainLongRestDegree = timer.getRemainLongRestTime() / 60 * 6;

  minuteHandRef.value.style.transform = `translate(-50%, -100%) rotate(${totalDegree}deg)`;
  centerRef.value.style.transform = `translate(-50%, -50%) rotate(${totalDegree + 45}deg)`;

  if (timer.currentPhase.value === 'longRest') {
    longRestRef.value.style.setProperty("--long-rest-degree", `${remainLongRestDegree}deg`);
  } else {
    focusRef.value.style.setProperty("--focus-degree", `${remainFocusDegree}deg`);
    focusRef.value.style.setProperty("--rest-degree", `${remainRestDegree}deg`);
  }
}
</script>

<style scoped>
.clock_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.clock {
  width: 70vh;
  height: 70vh;
  border-radius: 50%;
  background-color: var(--background-color);
  position: relative;
}

.clock__center {
  width: 30px;
  height: 30px;
  background-color: var(--text-color);
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 0 50% 50% 50%;
  transform: translate(-50%, -50%);
}

.clock_hand {
  width: 3px;
  height: 45px;
  background-color: var(--text-color);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: translate(-50%, -100%) rotate(45deg);
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
  background: conic-gradient(
    var(--rest-color) 0deg,
    var(--rest-color) var(--rest-degree),
    var(--focus-color) var(--rest-degree),
    var(--focus-color) calc(var(--rest-degree) + var(--focus-degree)),
    transparent calc(var(--rest-degree) + var(--focus-degree)),
    transparent 360deg
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.longRest {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: conic-gradient(
    var(--long-rest-color) 0deg,
    var(--long-rest-color) var(--long-rest-degree),
    transparent var(--long-rest-degree),
    transparent 360deg
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.font1 {
  font-size: calc(0.5rem + 2vmin);
  font-weight: 700;
}

</style>
