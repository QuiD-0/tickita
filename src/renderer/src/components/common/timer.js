import {ref, onMounted, computed, watch} from "vue";
import ControllerStore from "../../store/ControllerStore";
import SettingStore from "../../store/SettingStore";
import useSound from "../common/sound";

let useTimer = () => {
  const sound = useSound()
  const settingFocusTime = computed(() => SettingStore.getters.focusTime);
  const settingShortBreakTime = computed(() => SettingStore.getters.restTime);
  const settingLongBreakTime = computed(() => SettingStore.getters.longRestTime);
  const settingInterval = computed(() => SettingStore.getters.interval);

  let remainFocus = ref(SettingStore.getters.focusTime);
  let remainRest = ref(SettingStore.getters.restTime);
  let remainLongRest = ref(SettingStore.getters.longRestTime);
  let remainInterval = ref(SettingStore.getters.interval);

  const runningState = computed(() => ControllerStore.getters.runningState);
  const currentPhase = ref("focus");
  const SECONDS = 60;

  onMounted(() => {
    setInterval(() => {
      updateRemainTime();
      updateCurrentPhase();
    }, 1_000);
  });

  watch([settingFocusTime, settingShortBreakTime, settingLongBreakTime, settingInterval], () => {
    remainFocus.value = settingFocusTime.value;
    remainRest.value = settingShortBreakTime.value;
    remainLongRest.value = settingLongBreakTime.value;
    remainInterval.value = settingInterval.value;
    ControllerStore.commit("stop");
  });

  watch(runningState, (state) => {
    if (state === "init") {
      remainFocus.value = settingFocusTime.value;
      remainRest.value = settingShortBreakTime.value;
      remainLongRest.value = settingLongBreakTime.value;
      remainInterval.value = settingInterval.value;
    }
  });

  watch(currentPhase, (value, oldValue, _) => {
    if(oldValue === "focus" && value === "rest") {
      sound.playBeep();
    }
    if(oldValue === "rest" && value === "focus") {
      sound.playBeep();
    }
    if(oldValue === "longRest" && value === "focus") {
      sound.playBeep();
    }
  })

  function getRemainTime() {
    if (currentPhase.value === "longRest") {
      return remainLongRest.value;
    } else {
      return remainRest.value + remainFocus.value;
    }
  }
  function getRemainFocusTime() {
    return remainFocus.value;
  }
  function getRemainRestTime() {
    return remainRest.value;
  }
  function getRemainLongRestTime() {
    return remainLongRest.value;
  }

  function updateRemainTime() {
    if (runningState.value !== "play") return

    switch (currentPhase.value) {
      case "focus":
        remainFocus.value -= SECONDS;
        if (remainFocus.value <= 0) remainFocus.value = 0;
        break;
      case "rest":
        remainRest.value -= SECONDS;
        if (remainRest.value <= 0) remainRest.value = 0;
        break;
      case "longRest":
        remainLongRest.value -= SECONDS;
        if (remainLongRest.value <= 0) remainLongRest.value = 0;
        break;
    }
  }

  function updateCurrentPhase() {
    if (runningState.value !== "play") return

    let focus = remainFocus.value;
    let rest = remainRest.value;
    let longRest = remainLongRest.value;
    let interval = remainInterval.value;

    if(focus !== 0 && rest !== 0 && longRest !== 0) {
      currentPhase.value = "focus";
    }

    if(focus === 0 && rest !== 0 && longRest !== 0) {
      currentPhase.value = "rest";
    }

    if(focus === 0 && rest === 0 && interval > 0 && longRest !== 0) {
      remainInterval.value -= 1;
      if(remainInterval.value === 0) {
        currentPhase.value = "longRest";
      } else {
        currentPhase.value = "focus";
        remainFocus.value = settingFocusTime.value;
        remainRest.value = settingShortBreakTime.value;
      }
    }

    if(focus === 0 && rest === 0 && interval === 0 && longRest === 0) {
      currentPhase.value = "focus";
      ControllerStore.commit("stop");
    }
  }

  return {
    getRemainTime, getRemainFocusTime, getRemainRestTime, getRemainLongRestTime, currentPhase, settingFocusTime, settingShortBreakTime, settingLongBreakTime
  }
}

export default useTimer;
