<template>
  <div class="button_box" id="settings" @click="openSettings">
    <font-awesome-icon icon="fa-solid fa-cog"/>
  </div>
  <SettingModal :isOpen="open" @close="closeModal" />
</template>

<script setup>
import {ref} from "vue"
import ControllerStore from "../../store/ControllerStore";
import SettingModal from "./SettingModal.vue";

const open = ref(false)

function openSettings() {
  ControllerStore.commit('pause')
  open.value = true
}

function closeModal() {
  open.value = false
}

</script>
