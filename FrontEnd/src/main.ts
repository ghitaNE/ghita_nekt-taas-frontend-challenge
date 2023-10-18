import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
const pinia = createPinia()

library.add(fas)

app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
