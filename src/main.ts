import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


const app = createApp(App);
// Setze withCredentials für alle Anfragen
axios.defaults.withCredentials = false;

app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
  round(value: number, decimals: number = 0): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};

app.mount('#app');
