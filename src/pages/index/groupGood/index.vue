<template>
  <div>
    <transition name="fade">
      <skeleton v-if="showSkeleton" loading="chiaroscuro" bgcolor="#fff"></skeleton>
    </transition>
    <div class="main-content skeleton">
      <div v-if="tabsState" class="tabs-div">
        <div @click="tabsOnClick(index)" class="tabs-item" v-for="(item,index) in tabs">
          <div
            :class="{tabsBg:active==index}"
            style="border-radius: 31rpx;  padding: 10rpx 18rpx 10rpx 18rpx;"
          >{{item}}</div>
        </div>
      </div>
      <div>
        <!--style="padding-top:1.28rem"-->
        <div
          @click="goGoodDetail(index,item)"
          v-for="(item,index) in list"
          class="list-div boxshadow"
        >
          <div
            v-bind:style="{backgroundImage: 'url(' + item.commodityCover[0].commodity_cover_url + ')'}"
            class="listimg skeleton-rect"
            style="position:relative;"
          >
            <div
              style="letter-spacing: 1rpx;color: rgb(255, 255, 255);font-size:  30rpx;bottom: 0rpx;right: 0rpx;position: absolute;background-color: rgb(0, 0, 0);opacity: 0.25;padding: 10rpx;"
            >已售{{item.sales_volume}}件</div>
          </div>

          <div
            style="font-size: 46rpx;font-weight: normal;position:relative;font-stretch: normal;line-height: 60rpx;letter-spacing: 1rpx;padding:30rpx 40rpx;text-align:justify;color: #282828;"
          >
            <span class="skeleton-rect">{{item.commodity_name}}</span>
          </div>

          <div style="display:flex;padding:0 40rpx;">
            <div style="position:relative; color: #ff5c5c;font-size:60rpx;margin-right:10rpx;">
              <span class="skeleton-rect">￥{{item.price}}</span>
            </div>
            <div style="flex:1;position:relative;"></div>
            <div class="jbDiv skeleton-radius" style="position:relative;">
              赠
              <span style="margin:0 5rpx;">{{item.jb}}</span>
              <img style="width: 19rpx;height: 19rpx;" src="/static/img/jb.png">
            </div>
            <div
              v-show="false"
              style="letter-spacing: 1rpx;color: #adadad;font-size:30rpx;margin-top: 25rpx;"
            >已拼{{item.sales_volume}}件</div>
          </div>
        </div>
        <!-- <div style="font-size:28rpx;color:#c9c9c9;text-align:center;padding:30rpx;">
        <div v-if="bottomloading==true">
          <van-loading size="30rpx" type="spinner"/>
          <span style="margin-left:10rpx;">正在加载...</span>
        </div>
        <div v-if="bottomloading==false">没有更多了</div>
        </div>-->
        <bottomload v-if="bottomloadState" :bottomloading="bottomloading"></bottomload>
      </div>
      <div class="abnorClass" v-if="abnor">
        <wxc-abnor type="REQUEST_ERROR" @click="onAbnorTap" :title="abnorTitle"></wxc-abnor>
      </div>
    </div>
  </div>
  <!-- </van-tab> -->
  <!-- </van-tabs> -->
</template>
<script>
import bottomload from "../../../components/loadbottom/loadbottom";
export default {
  components: {
    bottomload
  },
  data() {
    return {
      abnorTitle: "",
      showSkeleton: true,
      abnor: false,
      bottomloading: true,
      bottomloadState: false,

      albumpic_big:
        "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
      type: 1,
      tabsState: false,
      page: 1,
      pageSize: 10,
      establishDate: "",
      tabs: ["默认", "价格", "金币", "销量"],
      active: 0,
      list: [
        {
          jb: 0.1,
          price: 0.2,
          sales_volume: 1,
          establish_time: 1544078182000,
          commodityCover: [
            {
              commodity_cover_url_wide: 397,
              commodity_cover_url:
                "http://www.yindantech.com:8882/data/commodity-banner-file/2018-12-06/8ab355d6-1a68-4a7e-832c-fb17a19f7fd1.jpg",
              commodity_cover_compress_url_high: 400,
              commodity_cover_compress_url_wide: 300,
              commodity_cover_url_high: 265,
              commodity_cover_compress_url:
                "http://www.yindantech.com:8882/data/commodity-banner-file/2018-12-06/yyy_8ab355d6-1a68-4a7e-832c-fb17a19f7fd1.jpg"
            }
          ],
          is_shopping_guide: 2,
          is_cash_delivery: 2,
          commodity_id: 31,
          commodity_name: "科技带来了考试因"
        },

        {
          jb: 0.2,
          price: 0.5,
          sales_volume: 0,
          establish_time: 1542764455000,
          commodityCover: [
            {
              commodity_cover_url_wide: 406,
              commodity_cover_url:
                "http://www.yindantech.com:8882/data/commodity-banner-file/2018-11-21/eeee892d-44da-4edf-93e1-1b2f0c338de0.jpg",
              commodity_cover_compress_url_high: 400,
              commodity_cover_compress_url_wide: 300,
              commodity_cover_url_high: 289,
              commodity_cover_compress_url:
                "http://www.yindantech.com:8882/data/commodity-banner-file/2018-11-21/yyy_eeee892d-44da-4edf-93e1-1b2f0c338de0.jpg"
            }
          ],
          is_shopping_guide: 2,
          is_cash_delivery: 2,
          commodity_id: 24,
          commodity_name: "吃吃推开他能吃顺 "
        }
      ]
    };
  },
  methods: {
    onAbnorTap() {
      this.pageData(this.type, this.page, this.pageSize, this.establishDate);
    },
    //  下拉加载
    onLoad() {
      this.page = this.page + 1;
      if (this.page == 1) {
        this.establishDate = "";
      } else {
        this.establishDate = this.formatTime(
          Date.parse(new Date()),
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      this.pageData(this.type, this.page, this.pageSize, this.establishDate);

      console.log("loadMore");
    },

    tabsOnClick(index) {
      this.active = index;
      this.list = [];
      this.page = 1;
      this.pageSize = 10;
      this.establishDate = "";
      this.type = index + 1;
      this.pageData(this.type, this.page, this.pageSize, this.establishDate);
    },
    // tabsChange(index, title) {
    //   this.$toast(index + title);
    //   this.list = [];
    //   this.page = 1;
    //   this.pageSize = 10;
    //   this.establishDate = "";
    //   this.type = index + 1;
    //   this.pageData(this.type, this.page, this.pageSize, this.establishDate);
    //   console.log("llllll");
    // },
    goGoodDetail(index, item) {
      this.navigatePageTo("/goodDetails/" + item.commodity_id);
    },
    pageData(type, page, pageSize, establishDate) {
      if (page !== 1) {
        this.bottomloadState = true;
      } else {
        this.bottomloadState = false;
      }
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "/commodityApi/selectCommodity.do",
          body: {
            type: type,
            page: page,
            pageSize: pageSize,
            establishDate: establishDate
          }
        })
        .then(data => {
          this.showSkeleton = false;

          console.log(data);
          if (data.data) {
            // this.list = data.data.list;
            for (var i = 0; i < data.data.list.length; i++) {
              this.list.push(data.data.list[i]);
            }

            if (
              data.data.list == "" ||
              data.data.list.length < this.pageSize ||
              !data.data.list
            ) {
              this.bottomloading = false;
            }

            wx.stopPullDownRefresh(); //停止下拉刷新

            console.log(this.list);
          } else {
            this.$toast("加载错误");
          }
        })
        .catch(err => {
          if (err == "网络连接超时") {
            this.abnorTitle = "网络连接超时";
            this.abnor = true;
          }
        });
    }
  },
  mounted() {
    this.pageData(this.type, this.page, this.pageSize, this.establishDate);
  },
  onPullDownRefresh() {
    this.list = [];
    this.page = 1;
    this.pageData(this.type, this.page, this.pageSize, this.establishDate);
  },
  onReachBottom() {
    this.bottomloading = true;
    this.onLoad();
  }
};
</script>

<style lang="less" scoped>
.main-content {
  .tabs-div {
    background: #ffffff;
    display: flex;
    position: fixed;
    z-index: 10000;
    top: 0;
    width: 100%;
    padding: 30rpx 0;
  }
  .tabs-item {
    flex: 1;
    font-size: 36rpx;
    color: #595959;
    text-align: center;
    margin: 0 30rpx;
  }

  .list-div {
    width: 690rpx;
    overflow: hidden;
    padding-bottom: 30rpx;
    margin: 30rpx auto;
    background-color: #ffffff;
    border-radius: 20rpx;
  }
  .listimg {
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    height: 388rpx;
    text-align: center;
    overflow: hidden;
  }
  .loading-bar {
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .tabsBg {
    background-color: #e4e4e4;
  }
  .jbDiv {
    text-align: center;
    padding: 1rpx 20rpx 0 20rpx;
    height: 42rpx;
    line-height: 42rpx;

    color: #ffffff;
    font-size: 30rpx;
    background-color: #ff5c5c;
    margin-top: 20rpx;
    border-radius: 21rpx;
  }
}
</style>

<style>
/* @import url("../../../style/goodDetails.css"); */
</style>

