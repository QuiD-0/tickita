<template>
  <div class="clock">
    <div></div>
    <div class="clock__face"></div>
  </div>
</template>

<style scoped>
.clock {
  width: 70vh;
  height: 70vh;
  border-radius: 50%;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.clock__face {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script setup>

</script>
