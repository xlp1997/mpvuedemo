/**
 * Created by zhengyi.fu on 2018/8/31.
 */
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()



const host = "http://www.yindantech.com:8888/collage-web"
//添加请求拦截器
fly.interceptors.request.use((request) => {
  // wx.showLoading({
  //   title: "加载中",
  //   mask: true
  // });
  wx.showNavigationBarLoading()
  console.log(request);

  console.log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`)


  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    "X-Tag": "flyio",
    'content-type': 'application/json'
  };

  let authParams = {
    //公共参数
    "categoryType": "SaleGoodsType@sim",
    "streamNo": "wxapp153570682909641893",
    "reqSource": "MALL_H5",
    "appid": "string",
    "timestamp": new Date().getTime(),
    "sign": "string"
  };

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === "") {
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body,
    // ...authParams
  }
  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    // wx.hideLoading();
    wx.hideNavigationBarLoading()
    return response.data; //请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log(err);
    // wx.hideLoading();
    wx.hideNavigationBarLoading()

    if (err.status == 0) {
      return "网络连接异常"
    } else if (err.status == 1) {
      return "网络连接超时"
    } else if (err.status == 401) {
      return "用户未登录"
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    };
  }
);




fly.config.baseURL = host;
fly.config.timeout = 5000;

export default fly;
