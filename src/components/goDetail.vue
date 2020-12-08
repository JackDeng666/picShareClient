<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    type: String,
    list: Array,
    index: Number
  },
  methods: {
    handleClick(){
      if(this.type == 'single'){
        getApp().globalData.imgList = [this.list[this.index]]
        getApp().globalData.imgIndex = 0
      }
      if(this.type == 'list'){
        getApp().globalData.imgList = this.list
        getApp().globalData.imgIndex = this.index
      }
      // 跳转
      uni.navigateTo({
        url: "/pages/imgDetail/index"
      })
    }
  }
}
</script>
