import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import router from './router'; // Import Vue Router

createApp(App)
  .use(router) // Use Vue Router in your app
  .mount('#app');
