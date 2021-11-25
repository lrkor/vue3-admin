import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import router from './router';
import store from './common/store';

import App from './App.vue';

import 'element-plus/dist/index.css';
import './common/styles/index.scss'; // global css

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
