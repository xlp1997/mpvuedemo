import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    "usingComponents": {
      "van-tab": "/static/dist/tab/index",
      "van-tabs": "/static/dist/tabs/index",
      "van-toast": "/static/dist/toast/index",
      "van-notify": "/static/dist/notify/index",
      "van-tab": "/static/dist/tab/index",
      "van-tabs": "/static/dist/tabs/index",
      "wxc-abnor": "/static/dist/wxc-abnor/dist/index",
      "van-loading": "/static/dist/loading/index"

    }
  }
}
