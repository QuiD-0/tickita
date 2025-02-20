<script setup>
import EmptyBox from "./common/EmptyBox.vue";
</script>

<template>
  <div class="header"></div>
  <EmptyBox height="30px" width="100%"/>
</template>

<style scoped>
.header {
  -webkit-app-region: drag;
  height: 30px;
  width: 100%;
  background-color: #00000000;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
