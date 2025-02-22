import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
import vClickOutside from 'v-click-outside';


createApp(App)
  .directive('clickOutside', vClickOutside.directive)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
