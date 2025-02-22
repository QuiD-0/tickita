import {createStore} from "vuex";
import persistedState from "vuex-persistedstate";

let SoundStore = createStore({
  state: {
    sounds: {
      clock: "white-noise.mp3",
      clock_volume: 30,
      prev_clock_volume: 30,
      beep: "alarm-beep.mp3",
      beep_volume: 30,
      prev_beep_volume: 30
    }
  },
  mutations: {
    setClockVolume(state, volume) {
      state.sounds.clock_volume = volume;
    },
    setBeepVolume(state, volume) {
      state.sounds.beep_volume = volume;
    },
    allMuted() {
      this.state.sounds.prev_clock_volume = this.state.sounds.clock_volume;
      this.state.sounds.prev_beep_volume = this.state.sounds.beep_volume;
      this.state.sounds.clock_volume = 0;
      this.state.sounds.beep_volume = 0;
    },
    allUnMuted() {
      this.state.sounds.clock_volume = this.state.sounds.prev_clock_volume;
      this.state.sounds.beep_volume = this.state.sounds.prev_beep_volume;
    },
  },
  getters: {
    clockVolume: state => state.sounds.clock_volume,
    beepVolume: state => state.sounds.beep_volume
  },
  plugins: [persistedState()]
});

export default SoundStore;
