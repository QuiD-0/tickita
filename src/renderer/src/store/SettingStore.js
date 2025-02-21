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
        shortCycles: 4,
        loop: 0
      }
    }
  },
  mutations: {
    toggleDarkMode() {
      this.state.settings.isDarkMode = !this.state.settings.isDarkMode;
    }
  },
  getters: {
    isDarkMode: state => {
      return state.settings.isDarkMode;
    }
  },
  plugins: [persistedState()]
});
