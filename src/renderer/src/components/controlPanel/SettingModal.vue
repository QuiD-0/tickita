<template xmlns="http://www.w3.org/1999/html">
  <Teleport to="#modal_dest">
    <Transition name="modal-background">
      <div class="background" v-if="isOpen" @click="closeModal">
      </div>
    </Transition>
    <Transition name="modal">
      <div v-if="isOpen" class="modal">
        <EmptyBox height="30px" width="100%"/>
        <div class="modal_content">

          <div class="timer_setting">
            <div class="timer_setting_item" v-for="item in settingItems" :key="item.id">
              <div class="timer_setting_text">{{item.name}}</div>
              <div class="setting_value">
                <div class="setting_button" @click="item.down">
                  <font-awesome-icon icon="fa-solid fa-minus"/>
                </div>
                <div class="setting_value_text">{{ item.value }}</div>
                <div class="setting_button" @click="item.up">
                  <font-awesome-icon icon="fa-solid fa-plus"/>
                </div>
              </div>
            </div>
          </div>

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
import {defineProps, defineEmits, computed} from 'vue'
import {useDark, useToggle} from "@vueuse/core";
import EmptyBox from "../common/EmptyBox.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import SettingStore from "../../store/SettingStore";

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
const focus = computed(() => SettingStore.getters.focusTime)
const rest = computed(() => SettingStore.getters.restTime)
const longBreak = computed(() => SettingStore.getters.longRestTime)
const interval = computed(() => SettingStore.getters.interval)

const focusUp = () => {
  SettingStore.commit('increaseFocusTime')
}
const focusDown = () => {
  SettingStore.commit('decreaseFocusTime')
}
const breakUp = () => {
  SettingStore.commit('increaseRestTime')
}
const breakDown = () => {
  SettingStore.commit('decreaseRestTime')
}
const intervalUp = () => {
  SettingStore.commit('increaseInterval')
}
const intervalDown = () => {
  SettingStore.commit('decreaseInterval')
}
const longBreakUp = () => {
  SettingStore.commit('increaseLongRestTime')
}
const longBreakDown = () => {
  SettingStore.commit('decreaseLongRestTime')
}

const settingItems = [
  {id: 1, name: 'Focus', value: focus, up: focusUp, down: focusDown},
  {id: 2, name: 'Break', value: rest, up: breakUp, down: breakDown},
  {id: 3, name: 'Loop', value: interval, up: intervalUp, down: intervalDown},
  {id: 4, name: 'LongBreak', value: longBreak, up: longBreakUp, down: longBreakDown},
]
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
  height: 47%;
  overflow: auto;
  background-color: var(--background-color);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.timer_setting {
  padding: 5px;
  margin: 20px 0;
  width: 100vh;
  height: 100px;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
}

.setting_value {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.setting_button {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
}

.timer_setting_text {
  text-align: center;
  width: 100%;
  font-size: 16px;
}

.setting_value_text {
  width: 30px;
  height: 30px;
  font-size: 20px;
  text-align: center;
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
