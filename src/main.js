import Vue from 'vue'
import App from './App'

import uView from "uview-ui"
import request from './utils/API/request'

import tabBar from './components/tabBar.vue'  
Vue.component('tab-bar', tabBar)

Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn'
App.mpType = 'app'

const app = new Vue({
  ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import API from '@/utils/API'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(API, app)

app.$mount()
