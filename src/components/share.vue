<template>
<view class="root">
  <u-image width="30%" height="30%" mode="widthFix" src="../static/comical.png" class="img"></u-image>
  <view class="share_box">
    <u-button class="btn" type="error" shape="square" @click="submit(0)">单图上传</u-button>
    <u-button class="btn" type="primary" shape="square" @click="submit(1)">图集上传</u-button>
  </view>
</view>
</template>

<script>
export default {
  methods: {
    submit(type) {
      uni.navigateTo({
        url: `/pages/upload/index?type=${type}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.root{
  height: 50vh;
  position: relative;
  .img{
    height: 60%;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translatex(-50%);
  }
  .share_box {
    width: 100%;
    position: absolute;
    bottom: 0;
    .btn{
      width: 80%;
      margin: 20rpx auto;
    }
  }
}
</style>