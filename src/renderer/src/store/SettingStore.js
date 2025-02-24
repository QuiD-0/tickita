import {createStore} from "vuex";
import persistedState from 'vuex-persistedstate'

let SettingStore = createStore({
  state: {
    settings: {
      time: {
        focus: 25 * 60,
        rest: 5 * 60,
        longRest: 30 * 60,
        interval: 4
      }
    }
  },
  mutations: {
    increaseFocusTime() {
      if(this.state.settings.time.focus + this.state.settings.time.rest >= 60 * 60) {
        return;
      }
      this.state.settings.time.focus += 5 * 60;
    },
    decreaseFocusTime() {
      if(this.state.settings.time.focus <= 5 * 60) {
        return;
      }
      this.state.settings.time.focus -= 5 * 60;
    },
    increaseRestTime() {
      if(this.state.settings.time.focus + this.state.settings.time.rest >= 60 * 60) {
        return;
      }
      this.state.settings.time.rest += 5 * 60;
    },
    decreaseRestTime() {
      if(this.state.settings.time.rest <= 5 * 60) {
        return;
      }
      this.state.settings.time.rest -= 5 * 60;
    },
    increaseLongRestTime() {
      if(this.state.settings.time.longRest >= 60 * 60) {
        return;
      }
      this.state.settings.time.longRest += 5 * 60;
    },
    decreaseLongRestTime() {
      if(this.state.settings.time.longRest <= 5 * 60) {
        return;
      }
      this.state.settings.time.longRest -= 5 * 60;
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
