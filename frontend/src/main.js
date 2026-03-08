import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
