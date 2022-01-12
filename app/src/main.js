import { createApp } from 'vue'

import './assets/index.css'

import App from './App.vue'
import router from '@/router'




const app = createApp(App);


// 5. Create and mount the root instance.
// const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

// Now the app has started!
