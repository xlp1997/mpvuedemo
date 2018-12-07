<!-- 我的订单-->
<template>
  <div>
    <van-tabs @change="tabChange" :swipe-threshold="5" sticky>
      <van-tab v-for="i in tabs" :title="i" :key="i"></van-tab>

      <div
        @click="itemClick(index,item)"
        v-for="(item,index) in myOrder"
        class="boxshadow"
        style="padding: 30rpx;margin-bottom:16rpx;background:#ffffff;"
      >
        <div style="display:flex; border-bottom:1rpx solid #efefef;padding-bottom:30rpx;">
          <div
            v-if="item.business"
            style="width:60rpx;  height:60rpx; margin-right:28rpx;  overflow: hidden; border-radius: 50%;background-repeat: no-repeat;background-size: cover; "
            :style="{backgroundImage:'url('+item.business.business_logo+')'}"
          ></div>

          <div
            v-if="item.business"
            style="	font-size: 36rpx;margin-top:10rpx;"
          >{{item.business.business_name}}</div>
          <div
            style="flex:1;text-align:right;font-size:36rpx;letter-spacing: 1rpx;color: #ff5c5c;margin-top:15rpx;"
          >
            <span v-if="item.order_type==1">待付款</span>
            <span v-if="item.order_type==2">待发货</span>
            <span v-if="item.order_type==3">待收货</span>
            <span v-if="item.order_type==4">申请退款中</span>
            <span v-if="item.order_type==5">已取消</span>
            <span v-if="item.order_type==6">已收货</span>
            <span v-if="item.order_type==7">待评价</span>
            <span v-if="item.order_type==8">已完成</span>
            <span v-if="item.order_type==9">已退款</span>
            <!-- 订单类型：1、待付款 2、待发货 3、待收货 4、申请退款中 5、已取消 6、已收货7、待评价8、已完成 -->
          </div>
        </div>

        <div style="margin-top:30rpx;padding-bottom:30rpx;border-bottom:1rpx solid #efefef;">
          <div style="display:flex;">
            <div
              style="width:200rpx; height:200rpx;margin-right:30rpx;position:relative; overflow: hidden;background-repeat: no-repeat; background-size: cover;"
              :style="{backgroundImage:'url('+item.commodity_cover_url+')'}"
            >
              <!-- <img width="100%" class="imgcenter" :src="item.commodity_cover_url"> -->
            </div>
            <div style="flex:1; padding:10rpx 0;">
              <div
                class="lianghang"
                style="font-size: 30rpx;width:454rpx;min-height:80rpx;color:#282828;text-align: justify;letter-spacing: 1rpx;"
              >{{item.commodity_name}}</div>
              <div
                style="letter-spacing: 1rpx;font-size:30rpx;color: #666666;overflow: hidden;text-overflow:ellipsis;width: 454rpx;white-space:nowrap"
              >
                <span>{{item.commodity_type_name}}</span>
              </div>
              <div
                style="display:inline-block;margin-top:30rpx;	color: #666666;"
              >X {{item.order_count}}</div>
              <div
                style="font-size:36rpx;color: #666666;display:inline-block;  float: right;margin-top:16rpx;"
              >￥{{item.priceCount}}</div>
            </div>
          </div>
        </div>

        <div
          style=" padding:30rpx 0;color: #666666;	letter-spacing: 1rpx;font-size:36rpx;text-align:right;border-bottom:1rpx solid #efefef;"
        >
          <span v-if="item.is_collage==1" class="pingzi" style>拼</span> 实付：
          <span style="color:#f44">￥{{item.actual_payment_price}}</span>
        </div>

        <div style="display:flex; ">
          <div style="flex:1"></div>
          <!-- 1 -->
          <div
            @click.stop="cencalMyOrder(index,item)"
            v-if="item.order_type==1"
            class="quxiaodingdanBtn"
            style=" margin:30rpx 0; border:1rpx solid #efefef;"
          >取消订单</div>
          <!-- <timeDown @time-end="timeEnd(index,item)" style="display:none;" :endTime='item.establish_time+1000*60*60'>)</timeDown> -->
          <div
            @click.stop="pay(index,item)"
            v-if="item.order_type==1"
            class="fukuan"
            style=" margin:30rpx 0 30rpx 60rpx;"
          >付款</div>
          <!-- 2 -->
          <div
            @click.stop="chakanwuliu(index,item)"
            v-if="item.order_type==3&&item.goods_receipt_type!==1"
            class="quxiaodingdanBtn"
            style="margin:30rpx 0 30rpx 60rpx;  border:1rpx solid #efefef;"
          >查看物流</div>
          <div
            @click.stop="querenshouhuo(index,item)"
            v-if="item.order_type==3"
            class="quxiaodingdanBtn"
            style=" margin:30rpx 0 30rpx 60rpx; color:#ffffff; border:none; background-color: #06cae1;"
          >确认收货</div>
          <!-- 3 -->
          <div
            @click.stop=" tuikuan(index, item)"
            v-if="item.order_type==2||item.order_type==3&&item.payment_type==1"
            style=" margin:30rpx 0 30rpx 60rpx;"
            class="quxiaodingdanBtn"
          >申请退款</div>
        </div>
        <div style="height:1rpx;"></div>
        <div
          @click.stop="godistriBution(index,item)"
          v-if="item.order_type==2||item.order_type==3||item.order_type==6"
          style="display:flex;padding-top:40rpx;font-size: 30rpx;"
        >
          <div style="flex:1;color: #7a7a7a;">
            导购奖励
            <span style="color: #ff5c5c;">{{item.fenxJb}}</span>
            金币（值{{item.moneyJb}}元）
          </div>
          <div style="color: #06cae1;">
            我要导购
            <img style="width: 14rpx;height:20rpx;" src="/static/img/rightblue.png">
          </div>
        </div>
      </div>
    </van-tabs>

    <bottomload v-if="bottomloadState" :bottomloading="bottomloading"></bottomload>
    <wxc-abnor v-if="noOrder" type="ORDER"></wxc-abnor>
  </div>
</template>

<script>
import bottomload from "../../components/loadbottom/loadbottom";
export default {
  components: {
    bottomload
  },

  data() {
    return {
      noOrder: false,
      currentTab: 0,
      swiperHeight: 0,
      bottomloading: true,
      bottomloadState: false,

      lineWidth: 50,
      loading: false,
      img: "https://goss.vcg.com/creative/vcg/400/version23/VCG218fde718f9.jpg",
      tabs: ["全部", "待付款", "待发货", "待收货", "退款中"],
      active: 0,
      page: 1,
      tabsIndex: 0,
      pageSize: 10,
      orderType: "",
      establishDate: "",
      userId: this.$publicVar.userId,
      myOrder: [] //商家
    };
  },

  methods: {
    onLoad() {
      // this.loading = false;
      this.page = this.page + 1;
      if (this.page == 1) {
        this.establishDate = "";
      } else {
        this.establishDate = this.formatTime(
          Date.parse(new Date()),
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      console.log("moreload");
      this.pageData(
        this.page,
        this.pageSize,
        this.establishDate,
        this.orderType
      );
    },
    godistriBution(index, item) {
      this.navigatePageTo("/yaoqing");
    },
    onRefresh() {
      console.log("ccc");
    },

    chakanwuliu(index, item) {
      this.$store.commit("setLogisticsDetails", {
        expNo: item.express_delivery_no,
        expCode: item.express_delivery_name,
        myOrderId: item.my_order_id
      });
      this.navigatePageTo("/logisticsDetails");
    }, //查看物流按钮
    cencalMyOrder(index, item) {
      this.$dialog
        .confirm({
          title: "取消订单",
          message: "确认取消订单？"
        })
        .then(() => {
          async(
            "/orderApi/cancelOrder.do",

            { myOrderId: this.myOrder[index].my_order_id }
            // "POST"
          ).then(data => {
            if (data.data) {
              if (data.data.order_type == 3) {
                // this.$toast.success(data.data.order_message);
                this.tabChange(this.tabsIndex);
              } else {
                // this.$toast.fail(data.data.order_message);
              }
            } else {
              // this.$toast.fail("加载错误");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    tuikuan(index, item) {
      this.$dialog
        .confirm({
          title: "确认退款",
          message: "确认申请退款？"
        })
        .then(() => {
          async(
            "/orderApi/returnGoods.do",

            { myOrderId: this.myOrder[index].my_order_id }
            // "POST"
          ).then(data => {
            if (data.data) {
              if (data.data.order_type == 3) {
                // this.$toast.success("申请退款成功");
                // this.$router.go(0);
                this.tabChange(this.tabsIndex);
                // this.myOrder.splice(index, 1);
                // this.loading = false;
                // this.page = this.page - 1;
                // this.onLoad();
              } else {
                // this.$toast.fail(data.data.order_message);
              }
            } else {
              // this.$toast.fail("加载错误");
            }
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    querenshouhuo(index, item) {
      this.$dialog
        .confirm({
          title: "确认收货",
          message: "是否确认收货？"
        })
        .then(() => {
          var data = new FormData();
          data.append("userId", this.userId);
          data.append("myOrderId", this.myOrder[index].my_order_id);

          //  userId:sessionStorage.getItem("userId"),
          // myOrderId: this.myOrder[index].my_order_id }
          async(
            "/orderApi/determineCollectGoods.do",
            data,
            "FORM",
            {}
            // "POST"
          ).then(data => {
            if (data.data) {
              if (data.data.order_type == 3) {
                // this.$toast.success(data.data.order_message);
                this.tabChange(this.tabsIndex);
              } else {
                // this.$toast.fail(data.data.order_message);
              }
            } else {
              // this.$toast.fail("加载错误");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    pay(index, item) {
      var myorder = {
        actualPaymentPrice: item.actual_payment_price,
        current_time: item.establish_time,
        establish_time: item.establish_time,
        myOrderId: item.my_order_id,
        orderNumber: item.order_number
      };

      var all = { collageId: 0 };

      sessionStorage.setItem("all", JSON.stringify(all));

      sessionStorage.setItem("myorder", JSON.stringify(myorder));
      sessionStorage.setItem("isOrNoPin", item.is_collage);

      this.navigatePageTo("/pay");
    },
    itemClick(index, item) {
      this.navigatePageTo(
        "/orderDetails" + "/" + this.myOrder[index].my_order_id
      );
    },
    loadmore() {},
    tabClick(index, title) {
      // this.pageData(this.page, this.pageSize, this.establishDate, orderType);
      // this.$toast(index + title);
    },
    tabChange(index, title) {
      this.noOrder = false;

      // this.bottomloading = true;
      // this.bottomloadState = true;
      this.myOrder = [];
      // alert(index + title);
      // this.tabsIndex = index;
      this.page = 1;
      this.pageSize = 10;
      this.establishDate = "";
      if (index.target.index == 0) {
        this.orderType = "";
      } else {
        this.orderType = index.target.index;
      }
      console.log(index);

      this.pageData(
        this.page,
        this.pageSize,
        this.establishDate,
        this.orderType
      );
    },
    pageData(page, pageSize, establishDate, orderType) {
      if (page !== 1) {
        this.bottomloadState = true;
      } else {
        this.bottomloadState = false;
      }
      //   var data = new FormData();
      //   data.append("userId", this.userId);
      //   data.append("page", page);
      //   data.append("pageSize", pageSize);
      //   data.append("establishDate", establishDate);
      // if (orderType !== "") {
      //   data.append("orderType", orderType);
      // }
      this.$fly
        .request({
          method: "get", //post/get 请求方式
          url: "/orderApi/selectOrderAllInfo.do",
          body: {
            userId: this.userId,
            page: page,
            pageSize: pageSize,
            establishDate: establishDate,
            orderType: orderType
          }
        })
        .then(data => {
          console.log(data);
          // 用户订单列表

          if (data.data) {
            if (data.data.myOrder) {
              for (var i = 0; i < data.data.myOrder.length; i++) {
                this.myOrder.push(data.data.myOrder[i]);
              }
              console.log(this.myOrder);
              for (var i = 0; i < this.myOrder.length; i++) {
                this.myOrder[i].priceCount =
                  this.myOrder[i].order_count * this.myOrder[i].commodity_price;
              }
            } else {
              this.bottomloading = false;
            }
            // 当第一页没有订单时order
            if (this.page == 1 && data.data.pageTotal == 0) {
              this.noOrder = true;
            }

            wx.stopPullDownRefresh(); //停止下拉刷新
          } else {
            // Toast("加载错误");
          }
        });
    }
  },
  mounted() {
    this.pageData(this.page, this.pageSize, this.establishDate, this.orderType);
    // this.$toast("加载错误");
  },
  onPullDownRefresh() {
    this.myOrder = [];
    this.page = 1;
    this.pageData(this.page, this.pageSize, this.establishDate, this.orderType);
  },
  onReachBottom() {
    this.bottomloading = true;
    this.onLoad();
  }
};
</script>
 <style>
.van-tabs__wrap {
  position: fixed !important;
}
</style>
 

<style lang="less" scoped>
.swiper-tab {
  width: 100%;
  border-bottom: 2rpx solid #ccc;
  text-align: center;
  height: 88rpx;
  line-height: 88rpx;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.swiper-tab-item {
  width: 30%;
  color: #434343;
}

.active {
  color: #f65959;
  border-bottom: 4rpx solid #f65959;
}

swiper {
  text-align: center;
  background-color: #fff;
  overflow-y: scroll;
}
.pingzi {
  display: inline-block;
  float: left;
  font-size: 36rpx;
  color: #ffffff;
  background-color: #ffc938;
  border-radius: 50%;
  width: 54rpx;
  height: 54rpx;
  line-height: 60rpx;
  text-align: center;
}
.quxiaodingdanBtn {
  width: 230rpx;
  padding: 12rpx 0 10rpx 0;
  text-align: center;
  border-radius: 40rpx;
  border: solid 1rpx #adadad;
  color: #7a7a7a;
  font-size: 36rpx;
  margin-left: 60rpx;
}
.fukuan {
  color: #fefefe;
  font-size: 36rpx;
  margin-left: 60rpx;

  width: 161rpx;
  padding: 12rpx 0 10rpx 0;
  text-align: center;
  background-color: #06cae1;
  border-radius: 40rpx;
}
</style>
