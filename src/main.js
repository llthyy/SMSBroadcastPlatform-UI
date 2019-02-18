import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueRouter from 'vue-router'


Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
//Vue.use(axios);
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
Vue.use(qs);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
