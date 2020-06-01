import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)


import moment from 'moment'

Vue.prototype.moment = moment