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
      // 跳转
      uni.navigateTo({
        url: "/pages/imgDetail/index"
      })
    }
  }
}
</script>
