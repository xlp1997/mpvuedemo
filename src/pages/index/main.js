import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '商品列表',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",

    usingComponents: {
      "van-button": "/static/dist/button/index",
      "van-notice-bar": "/static/dist/notice-bar/index",
      "van-slider": "/static/dist/slider/index",
      "van-field": "/static/dist/field/index",
      "van-nav-bar": "/static/dist/nav-bar/index",
      "van-icon": "/static/dist/icon/index",
      "van-tabbar": "/static/dist/tabbar/index",
      "van-tabbar-item": "/static/dist/tabbar-item/index",
      "van-loading": "/static/dist/loading/index",
      "wxc-abnor": "/static/dist/wxc-abnor/dist/index",

      "skeleton": "/static/dist/skeleton/skeleton"


    }
  }
}
