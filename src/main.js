import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/globals.scss'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.directive('focus', {
  mounted: (el) => {
    el.focus();
  },
})

library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')