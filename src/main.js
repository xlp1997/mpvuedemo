import Vue from 'vue'
import App from './App'
import store from './store'
import wxService from './api/wxService'
import httpService from './api/httpService'
import Fly from './api/httpFly';
//常用过滤器
import filter from './pages/config/filter'
Vue.use(filter);

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$fly = Fly
var publicVar = {
  userId: "NuqO2HZ47VhjI4biLPyDoPRrvycpZfAxnCI/LxbIygt28XDdYLFydktGVwUj7QSFc6+Z82M+3avw4Tg/JLob8SerK/pyEGw9Cn2XvGw7fN8adcbIQQjPVvhm/3OFVUBgmf1FUt/QpBmDgt5XqhT36cp5SQPlDKK7UVFBc75p5vs="
}
Vue.prototype.$publicVar = publicVar

Vue.mixin({
  data() {
    return {
      service: '',
      router: '/',
      imgSrc: '/'
    }
  },
  methods: {
    newroot() { //
      return this.$root.$mp
    },
    navigatePageTo(url) {
      wx.navigateTo({
        url: url
      })
    },
    reLaunchPageTo(url) {
      wx.reLaunch({
        url: url
      })
    },
    setStorageSync(name, data) {
      wx.setStorageSync(name, data)
    },
    getStorageSync(name) {
      return wx.getStorageSync(name)
    }
  },
  created() {
    // console.log('wx')
    this.service = wxService
  }
})

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'mpvue demo',
      navigationBarTextStyle: 'black',
      "usingComponents": {


      }

    },
    "tabBar": {
      "color": "#999",
      "selectedColor": "#000",
      "backgroundColor": "#fff",
      "borderStyle": "black",
      "list": [{
          "text": "首页",
          "pagePath": "pages/index/main",
          "iconPath": "/static/img/tabbarimg/icon_tabbar_home@3x.png",
          "selectedIconPath": "/static/img/tabbarimg/icon_tabbar_home_selected@3x.png"
        },
        {
          "text": "订单",
          "pagePath": "pages/myorder/main",
          "iconPath": "/static/img/tabbarimg/icon_tabbar_order@3x.png",
          "selectedIconPath": "/static/img/tabbarimg/icon_tabbar_order_selected@3x.png"
        },

      ]
    }

  }
}
