import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue';
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",//its for removing # tag from url
  routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
