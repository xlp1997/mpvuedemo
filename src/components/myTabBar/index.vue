<template>
  <div>
    <van-tabbar :active="activeIndex" @change="onChange2">
      <van-tabbar-item icon="shop">商品</van-tabbar-item>
      <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ["activeIndex"],
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange2(event) {
      this.$emit("tabsClick", event.mp.detail);
    }
  }
};
</script>

<style>
.card {
  padding: 10px;
  margin: 0;
}
</style>
