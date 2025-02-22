<template>
  <div class="button_box" id="dark_mode" @click="toggle()">
    <font-awesome-icon v-if="dark" icon="fa-solid fa-sun"/>
    <font-awesome-icon v-else icon="fa-solid fa-moon"/>
  </div>
</template>

<script setup>
import {useDark, useToggle} from "@vueuse/core";

const dark = useDark()
const toggle = useToggle(dark)
</script>
