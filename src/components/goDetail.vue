<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick(){
      // 缓存
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      getApp().globalData.tdata = '{"id":"meinv07","title":"美女","name":"meinv07","img_num":10,"img_src":"https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv07.jpg","guid":"90C926EF-805C-42C4-A3CA-C65401317547meinv07"}'
      // 跳转
      uni.navigateTo({
        url: "/pages/imgDetail/index"
      })
    }
  }
}
</script>

<style lang="scss">

</style>