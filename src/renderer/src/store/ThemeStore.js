import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  plugins: [createPersistedState()]
})

export default themeStore
