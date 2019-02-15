import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(axios);
Vue.prototype.$ajax = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
