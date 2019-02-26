import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import qs from 'qs'
import axios from './http'
import VueCookie  from 'vue-cookie'

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VueCookie)
// Vue.prototype.axios = axios;


Vue.prototype.qs = qs
Vue.prototype.baseUrl = "http://192.168.4.114:8080";
Vue.prototype.baseUrl1 = "http://192.168.4.165:8080";

// Vue.prototype.baseUrl = "http://192.168.4.100:9090";
// Vue.prototype.baseUrl1 = "http://192.168.4.100:9090";
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
