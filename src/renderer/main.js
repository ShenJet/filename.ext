import Vue from 'vue'
// import axios from 'axios'

import App from './App'
// import router from './router'

import {Tabs,Tooltip,Icon,Input,List,Modal,Message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Icon)
Vue.use(Input)
Vue.use(List)
Vue.use(Modal)

Vue.prototype.$message = Message

// ,Tooltip,Icon,Input,List

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  // router,
  template: '<App/>'
}).$mount('#app')
