require('./bootstrap');

import Vue from 'vue'
import router from './router.js'
import VueSocialSharing from 'vue-social-sharing'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(VueSocialSharing);
Vue.use(VueCompositionAPI)

new Vue({
  el: '#app',
  router: router,
}).$mount('#app')