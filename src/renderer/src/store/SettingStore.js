import {createStore} from "vuex";
import persistedState from 'vuex-persistedstate'

let SettingStore = createStore({
  state: {
    settings: {
      isDarkMode: false,
      time: {
        focus: 25,
        rest: 5,
        longRest: 30,
        interval: 4
      }
    }
  },
  mutations: {
    toggleDarkMode() {
      this.state.settings.isDarkMode = !this.state.settings.isDarkMode;
    },
    increaseFocusTime() {
      if(this.state.settings.time.focus + this.state.settings.time.rest >= 60) {
        return;
      }
      this.state.settings.time.focus += 5;
    },
    decreaseFocusTime() {
      if(this.state.settings.time.focus <= 5) {
        return;
      }
      this.state.settings.time.focus -= 5;
    },
    increaseRestTime() {
      if(this.state.settings.time.focus + this.state.settings.time.rest >= 60) {
        return;
      }
      this.state.settings.time.rest += 5;
    },
    decreaseRestTime() {
      if(this.state.settings.time.rest <= 5) {
        return;
      }
      this.state.settings.time.rest -= 5;
    },
    increaseLongRestTime() {
      if(this.state.settings.time.longRest >= 60) {
        return;
      }
      this.state.settings.time.longRest += 5;
    },
    decreaseLongRestTime() {
      if(this.state.settings.time.longRest <= 5) {
        return;
      }
      this.state.settings.time.longRest -= 5;
    },
    increaseInterval() {
      this.state.settings.time.interval += 1;
    },
    decreaseInterval() {
      if (this.state.settings.time.interval <= 1) {
        return;
      }
      this.state.settings.time.interval -= 1;
    }
  },
  getters: {
    focusTime: state => state.settings.time.focus,
    restTime: state => state.settings.time.rest,
    longRestTime: state => state.settings.time.longRest,
    interval: state => state.settings.time.interval,
  },
  plugins: [persistedState()]
});

export default SettingStore;
