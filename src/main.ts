import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from "axios";

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080/api/v1'

app.use(createPinia())

app.mount('#app')
