import BASIC_URL from './config'

import Picture from './Picture'
import User from './User'

// 此处第二个参数vm，就是我们在页面使用的this
const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
    baseUrl: BASIC_URL, 
    showLoading: true,
    loadingText: '请求中...',
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // 配置请求头信息
    header: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
  
  let picture = new Picture(vm.$u)
  let user = new User(vm.$u)
	vm.$u.api = {
    picture, 
    user
  }
}

export default {
	install
}
