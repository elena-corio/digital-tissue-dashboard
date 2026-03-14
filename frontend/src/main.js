import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router.js';
import urql from '@urql/vue'
import { speckleClient } from './services/speckleClient';

const app = createApp(App);
app.use(router);
app.use(urql, speckleClient)
app.mount('#app');
