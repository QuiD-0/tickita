<template>
  <div class="clock">
    <div class="clock__center" ref="centerRef"></div>
    <div class="clock_hand" ref="minuteHandRef"></div>
    <div class="numbers" ref="numbersRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const minuteHandRef = ref(null);
const centerRef = ref(null);
const numbersRef = ref(null);

onMounted(() => {
  createNumbers();
  updateMinuteHand();
  setInterval(updateMinuteHand, 60000);
});

function createNumbers() {
  if (!numbersRef.value) return;

  const rome_number = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  numbersRef.value.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) - 90;
    const x = 50 + 43 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 43 * Math.sin(angle * Math.PI / 180);

    const span = document.createElement("span");
    span.innerText = rome_number[i];
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

  const now = new Date();
  const minutes = now.getMinutes();
  const degrees = (minutes / 60) * 360;

  minuteHandRef.value.style.transform = `translate(-50%, -100%) rotate(${degrees}deg)`;
  centerRef.value.style.transform = `translate(-50%, -50%) rotate(${degrees + 45}deg)`;
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
