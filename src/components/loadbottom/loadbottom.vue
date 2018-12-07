<template>
  <div>
    <div style="font-size:28rpx;color:#c9c9c9;text-align:center;padding:30rpx;">
      <transition name="fade">
        <div v-if="bottomload==true">
          <van-loading size="30rpx" type="spinner"/>
          <span style="margin-left:10rpx;">正在加载...</span>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="bottomload==false">没有更多了</div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bottomloading"],
  data() {
    return {
      bottomload: this.bottomloading
    };
  },
  mounted() {
    // console.log(this.bottomload);
  },
  watch: {
    bottomloading: function(newVal, oldVal) {
      console.log(newVal);
      this.bottomload = newVal;
    }
  }
};
</script>

