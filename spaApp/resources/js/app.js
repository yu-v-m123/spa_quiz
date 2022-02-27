require('./bootstrap');

import Vue from 'vue'
import router from './router.js'
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);

new Vue({
  el: '#app',
  router: router,
}).$mount('#app')