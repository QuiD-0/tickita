import { createStore } from "vuex";

let ControllerStore = createStore({
  state: {
    controller: {
      isRunning: false,
      isPaused: false,
      runningState: "init",
    }
  },
  mutations: {
    start(){
      this.state.controller.runningState = "play";
      this.state.controller.isRunning = true;
      this.state.controller.isPaused = false;
    },
    pause(){
      this.state.controller.runningState = "pause";
      this.state.controller.isPaused = true;
    },
    resume(){
      this.state.controller.runningState = "play";
      this.state.controller.isPaused = false;
    },
    stop(){
      this.state.controller.runningState = "init";
      this.state.controller.isRunning = false;
      this.state.controller.isPaused = false;
    }
  },
  getters: {
    isRunning: state => {
      return state.controller.isRunning;
    },
    isPaused: state => {
      return state.controller.isPaused;
    },
    runningState: state => {
      return state.controller.runningState;
    }
  }
});

export default ControllerStore;
