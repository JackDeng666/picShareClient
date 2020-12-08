<template>
<view class="root">
  <!-- <u-alert-tips class="title" type="warning" title="登高望远" description=""></u-alert-tips> -->
  <view class="share_box">
    <u-button :custom-style="btnStyle" size="default" type="error" shape="square" @click="submit(0)">单图上传</u-button>
    <u-button :custom-style="btnStyle" size="default" type="primary" shape="square" @click="submit(1)">图集上传</u-button>
  </view>
</view>
</template>

<script>
export default {
  data() {
    return {
      btnStyle: {
        width: '75%',
        margin: '20rpx auto'
      },
    }
  },
  methods: {
    submit(type) {
      let data = uni.getStorageSync('userInfo')
      if(data == ''){
        return uni.showToast({
          icon: 'none',
          title: '请先登录',
          duration: 1000
        })
      }
      if(type == 0){
        uni.navigateTo({
          url: `/pages/upload/choiceTag`
        })
      }
      if(type == 1){
        uni.navigateTo({
          url: `/pages/upload/createPicList`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.root{
  height: 30vh;
  position: relative;
  .title{
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translatex(-50%);
  }
  .share_box {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>