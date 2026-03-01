import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import urql from '@urql/vue'
import { speckleClient } from './services/speckle/client'

const app = createApp(App)

// Provide urql client to all components
app.use(urql, speckleClient)

app.mount('#app')
