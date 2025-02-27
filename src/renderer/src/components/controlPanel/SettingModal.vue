<template xmlns="http://www.w3.org/1999/html">
  <Teleport to="#modal_dest">
    <Transition name="modal">
      <div v-if="isOpen" class="modal">
        <EmptyBox height="30px" width="100%"/>
        <div class="header">
          <div class="close_button" @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-angle-left"/>
          </div>
          <div class="title">Settings</div>
        </div>
        <div class="modal_content">
          <div class="setting_box">
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
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import EmptyBox from "../common/EmptyBox.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import SettingStore from "../../store/SettingStore";

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
const focus = computed(() => SettingStore.getters.focusTime / 60)
const rest = computed(() => SettingStore.getters.restTime / 60)
const longBreak = computed(() => SettingStore.getters.longRestTime / 60)
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
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--background-color);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.header {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.title {
  text-align: center;
}

.setting_box {
  margin: 0;
  padding: 10px;
  width: 100vh;
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

.close_button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
