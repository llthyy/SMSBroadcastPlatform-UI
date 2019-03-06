import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import VueAxios from 'vue-axios';
import qs from 'qs'
import axios from './http'
import VueCookie  from 'vue-cookie'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(Vuex);

import store from './vuex/store'

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(iView);
Vue.use(VueAxios, axios);

Vue.use(VueCookie)
// Vue.prototype.axios = axios;


Vue.prototype.qs = qs
Vue.prototype.baseUrl = "http://192.168.4.114:8080";
//Vue.prototype.baseUrl1 = "http://192.168.4.165:9090";
Vue.prototype.baseUrl1 = "http://192.168.4.114:8080";


// Vue.prototype.baseUrl = "http://192.168.4.100:9090";
// Vue.prototype.baseUrl1 = "http://192.168.4.100:9090";
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
