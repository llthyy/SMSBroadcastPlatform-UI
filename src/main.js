import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import qs from 'qs'

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
//Vue.prototype.$axios = axios;
Vue.prototype.qs = qs
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
