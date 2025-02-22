import {createStore} from "vuex";
import persistedState from "vuex-persistedstate";

let SoundStore = createStore({
  state: {
    sounds: {
      clock_volume: 20,
      beep_volume: 20,
    }
  },
  mutations: {
    setClockVolume(state, volume) {
      state.sounds.clock_volume = volume;
    },
    setBeepVolume(state, volume) {
      state.sounds.beep_volume = volume;
    }
  },
  getters: {
    clockVolume: state => state.sounds.clock_volume,
    beepVolume: state => state.sounds.beep_volume
  },
  plugins: [persistedState()]
});

export default SoundStore;
