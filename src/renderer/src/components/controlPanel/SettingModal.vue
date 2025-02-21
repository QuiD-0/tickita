<template>
  <Teleport to="#modal_dest">
    <Transition name="modal-background">
      <div class="background" v-if="isOpen" @click="closeModal">
      </div>
    </Transition>
    <Transition name="modal">
      <div v-if="isOpen" class="modal">
        <EmptyBox height="30px" width="100%"/>
        <div class="modal_content">
          <div class="timer_setting">timer</div>
          <div class="language_setting">lang</div>
          <div class="sound_setting">sound</div>
          <div class="dark_setting" @click="toggle()">dark {{dark}}</div>
        </div>
        <div class="footer">
          <div class="close_button" @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-angle-up"/>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import { useDark, useToggle } from "@vueuse/core";
import EmptyBox from "../common/EmptyBox.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const dark = useDark()
const toggle = useToggle(dark)
</script>

<style scoped>

.background {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 90%;
  overflow: auto;
  background-color: var(--background-color);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.close_button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.4s;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-background-enter-active,
.modal-background-leave-active {
  transition: all 0.3s ease;
}

.modal-background-enter-from,
.modal-background-leave-to {
  opacity: 0;
}

.modal-background-enter-to,
.modal-background-leave-from {
  opacity: 1;
}

</style>
