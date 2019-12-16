import Vue from 'vue';
import VueJsonp from 'vue-jsonp';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false;

Vue.use(VueJsonp);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
