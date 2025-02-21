import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'

let themeStore = createStore({
  state() {
    return {
      theme: 'default'
    }
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
    }
  },
  plugins: [persistedState()]
})

export default themeStore
