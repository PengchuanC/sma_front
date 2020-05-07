import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import less from 'less'

import 'at-ui-style'
import { Message } from 'at-ui'

import moment from 'moment'

Vue.use(less)

axios.defaults.baseURL = "http://10.170.236.148:8000/"
axios.defaults.baseURL = "http://localhost:8000/"
Vue.prototype.http = axios
Vue.prototype.$Message = Message
Vue.prototype.$token = ''
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
