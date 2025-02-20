<script setup>
import Header from './components/Header.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <Header/>
</template>
