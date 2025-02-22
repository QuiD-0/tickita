import { createStore } from "vuex";

let ControllerStore = createStore({
  state: {
    controller: {
      isRunning: false,
      isPaused: false,
      runningState: "init"
    }
  },
  mutations: {
    start(){
      this.state.controller.runningState = "focus";
      this.state.controller.isRunning = true;
      this.state.controller.isPaused = false;
    },
    pause(){
      this.state.controller.runningState = "pause";
      this.state.controller.isPaused = true;
    },
    resume(){
      this.state.controller.runningState = "focus";
      this.state.controller.isPaused = false;
    },
    finish(){
      this.state.controller.runningState = "finish";
    },
    resting(){
      this.state.controller.runningState = "rest";
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
