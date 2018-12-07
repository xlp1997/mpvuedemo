<template>
  <div class="container">
    <!-- <div :class="{ active: activeIndex!==0 }"> -->
    <card0 v-if="card0State"></card0>
    <!-- </div> -->
    <!-- <div :class="{ active: activeIndex!==1 }"> -->
    <!-- <card1 v-if="card1State"></card1> -->
    <!-- </div> -->
    <!-- <div>
      <my-tab-bar @tabsClick="tabsClickP" :activeIndex="activeIndex"></my-tab-bar>
    </div>-->
  </div>
</template>
<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
<script>
// 组件引用
import card0 from "./groupGood/index";
import card1 from "../logs/index";

import myTabBar from "@/components/myTabBar";

export default {
  data() {
    return {
      userInfo: {
        avatarUrl:
          "https://wx.qlogo.cn/mmopen/vi_32/SYiaiba5faeraYBoQCWdsBX4hSjFKiawzhIpnXjejDtjmiaFqMqhIlRBqR7IVdbKE51npeF6X1cXxtDQD2bzehgqMA/132",
        nickName: "jayzou"
      },
      activeIndex: 0,
      motto: "Hello World",
      readonly: false,

      demo1: "",
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      card0State: true,
      card1State: false,

      showMenus: false,
      list: ["a", "b", "c"],
      result: ["a", "b"],
      sms: "",
      showSkeleton: true
    };
  },
  components: {
    card0,
    card1,
    myTabBar
  },
  methods: {
    gotoGame(path) {
      this.navigatePageTo(this.router + path + "?id=123456");
    },
    tabsClickP(data) {
      this.activeIndex = data;
      console.log(data);
      if (data == 0) {
        this.editTitle("商品列表");
        this.card0State = true;
        this.card1State = false;
      }
      if (data == 1) {
        this.editTitle("标签2");
        this.card0State = false;

        this.card1State = true;
      }
    },
    gotoGamexx() {
      this.gotoGame("pages/index/groupGood/main");
      //通过用户id获取信息,参数直接写在url中
      // this.$fly
      //   .get(
      //     "http://www.yindantech.com:8888/collage-web/commodityApi/selectCommodity.do?type=1&page=1&pageSize=10&establishDate="
      //   )
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    editTitle(title) {
      // wx.setNavigationBarTitle({
      //   title: title
      // });
    }
  },
  mounted() {
    // this.tabsClickP(this.activeIndex);
  }
};
</script>

<style lang="less" scoped>
.container {
  // padding-bottom: 100rpx;
  background: #ffffff;
}
.active {
  display: none;
}
</style>
