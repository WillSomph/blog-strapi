// main.js
import { createApp } from 'vue';
import App from './App.vue';
import axios from './axios';

const app = createApp(App);

// Injection d'Axios dans l'instance Vue
app.config.globalProperties.$axios = axios;

app.mount('#app');
