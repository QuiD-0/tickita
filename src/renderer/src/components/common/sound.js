import {computed, watch} from "vue";
import ControllerStore from "../../store/ControllerStore";
import SoundStore from "../../store/SoundStore";

let useSound = () => {
  const controlState = computed(() => ControllerStore.getters.runningState)

  const clockVolume = computed(() => SoundStore.getters.clockVolume)
  const beepVolume = computed(() => SoundStore.getters.beepVolume)

  const clock = new Audio('src/assets/white-noise.mp3')
  clock.loop = true
  clock.volume = clockVolume.value / 100

  const beep = new Audio('src/assets/alarm-beep.mp3')
  beep.volume = beepVolume.value / 100

  watch(controlState, (value) => {
    switch (value) {
      case 'play':
        clock.play()
        break
      case 'pause':
      case 'init':
        clock.pause()
        break
    }
  })

  watch(clockVolume, (value) => {
    clock.volume = value / 100
  })

  watch(beepVolume, (value) => {
    beep.volume = value / 100
  })

  function playBeep() {
    beep.currentTime = 0;
    beep.play();
  }

  return {
    playBeep,
  };
}

export default useSound;
