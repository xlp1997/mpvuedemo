<template>
  <div>
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
  </div>
</template>
<script>
export default {
  props: ["pmyOrder"],

  data() {
    return {
      myOrder: this.pmyOrder
    };
  },
  methods: {
    itemClick(index, item) {
      this.$emit("itemClick", index, item);
    }
  },
  mounted() {
    console.log("list子组件mounted方法" + this.pmyOrder);
  }
};
</script>

<style lang="less" scoped>
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
