import {createStore} from "vuex";
import persistedState from "vuex-persistedstate";

let SoundStore = createStore({
  state: {
    sounds: {
      clock: "white-noise.mp3",
      clock_volume: 30,
      beep: "alarm-beep.mp3",
      beep_volume: 30,
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
