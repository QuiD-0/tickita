<template>
  <div class="clock">
    <div class="clock__face">

    </div>
  </div>
</template>

<script setup>

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

.clock__face {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--text-color);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
