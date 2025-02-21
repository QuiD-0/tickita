import { createStore } from "vuex";

let ControllerStore = createStore({
  state: {
    controller: {
      isRunning: false,
      isPaused: false,
    }
  },
  mutations: {
    start(){
      this.state.controller.isRunning = true;
      this.state.controller.isPaused = false;
    },
    pause(){
      this.state.controller.isPaused = true;
    },
    resume(){
      this.state.controller.isPaused = false;
    },
    stop(){
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
    }
  }
});

export default ControllerStore;
