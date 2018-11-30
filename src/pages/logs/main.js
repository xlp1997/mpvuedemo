import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '启动日志',
    navigationBarBackgroundColor: "#000000",
    navigationBarTextStyle: "white",
    backgroundColor: "#eeeeee",
    backgroundTextStyle: "light"


  }
}
