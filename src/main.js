import { createApp } from 'vue';

import axios from 'axios';
import 'bootstrap';
import VueAxios from 'vue-axios';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import VeeValidateRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(Loading);

app.mount('#app');

// 加入所有規則
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, VeeValidateRules[rule]);
  }
});

// Activate the locale
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

// 設定預設語系
setLocale('zh_TW');
