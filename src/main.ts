import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
  round(value: number, decimals: number = 0): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};

app.mount('#app');
