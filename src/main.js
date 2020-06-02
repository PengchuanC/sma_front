import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './components/scripts/http'
import less from 'less'

import 'at-ui-style'
import { Message } from 'at-ui'

import moment from 'moment'

Vue.use(less)


Vue.prototype.http = http
Vue.prototype.$Message = Message
Vue.prototype.$token = ''
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
