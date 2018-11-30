<template>
  <div class="container">
    <div style="width: 100%;text-align: left; padding-bottom: 50px;">
      <van-nav-bar title="标题" left-text="返回" left-arrow>
        <van-icon name="search" slot="right"/>
      </van-nav-bar>
      <van-button type="primary">按钮</van-button>
      <van-notice-bar
        left-icon="https://img.yzcdn.cn/1.png"
        text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      />
      <div style="padding: 20px 0;">
        <van-cell-group>
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            use-button-slot
          >
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 图片引用的两种方式 -->
      <img class="logo" src="/static/img/logo.png" alt>
      <card :text="motto"></card>
      <form class="form-container">
        <input type="text" class="form-control" v-model="motto" placeholder="v-model">
        <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
      </form>
      <!-- 路由跳转 -->
      <a @click="gotoGame('pages/counter/main')" class="counter">去往Vuex示例页面</a>
      <a @click="gotoGame('pages/logs/main')" class="counter">去往logs页面</a>
    </div>
    <div>
      <my-tab-bar :activeIndex="0"></my-tab-bar>
    </div>
  </div>
</template>

<script>
// 组件引用
import card from "@/components/card";
import myTabBar from "@/components/myTabBar";

export default {
  data() {
    return {
      motto: "Hello World",
      readonly: false,
      demo1: "",
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      showMenus: false,
      list: ["a", "b", "c"],
      result: ["a", "b"],
      sms: ""
    };
  },
  components: {
    card,
    myTabBar
  },
  methods: {
    gotoGame(path) {
      this.navigatePageTo(this.router + path + "?id=123456");
    }
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128/7.5vw;
  height: 128/7.5vw;
  margin: 20/7.5vw;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  height: 25px;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance: none;
  outline: none;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.container .girl {
  width: 275px;
  height: 400px;
}
.container .logo {
  width: 200px;
  height: 200px;
}
</style>
