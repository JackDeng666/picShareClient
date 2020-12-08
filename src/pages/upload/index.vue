<template>
<view>
  <view class="up_box">
    <u-upload 
      ref="uUpload"
      :action="action"
      :form-data="model"
      :auto-upload="false"
      :max-size="100 * 1024 * 1024" 
      :max-count="maxCount"
      @on-uploaded="allOk"
      @on-change="change">
    </u-upload>

    <u-button class="btn" type="success" @click="uploadSubmit">提交</u-button>
    <u-button class="btn" type="warning" @click="clearList">清空列表</u-button>
    <u-button class="btn" type="primary" @click="back">返回</u-button>

  </view>
</view>
</template>

<script>
import URL from '../../utils/API/config' 
export default {
  data() {
    return {
      type: 0, // 单图上传还是图集上传
      action: '', // 上传地址
      maxCount: 1,
      model: {},
    }
  },
  methods: {
    change(res, index, lists, name){
      console.log(res)
    },
    allOk(lists, name){
      uni.hideLoading()
      uni.showToast({
        icon: 'none',
        title: '上传成功',
        duration: 1000
      })
    },
    uploadSubmit() {
      console.log(this.model)
      uni.showLoading({
        title: '上传中...'
      })
      this.$refs.uUpload.upload()
    },
    clearList(){
     this.$refs.uUpload.clear()
    },
    back(){
      uni.navigateBack({  
        delta: 2
      })
    }
  },
  mounted(){
    let {currentUploadData} = getApp().globalData
    if(this.type == 0){
      this.model.userId = currentUploadData.userId
      this.model.categorys = JSON.stringify(currentUploadData.categorys)
      this.action = URL + 'pic/uploadSinglePic'
    }
    if(this.type == 1){
      this.maxCount = 50
      this.model.picList = JSON.stringify(currentUploadData.picList)
      this.model.categorys = JSON.stringify(currentUploadData.categorys)
      this.action = URL + 'pic/uploadPicToList'
    }
  },
  onLoad(options){
    this.type = options.type
  }
}
</script>

<style lang="scss" scoped>
.up_box{
  background-color: #fff;
  height: 100vh;
  text-align: center;
  padding: 20rpx;
  .btn{
    margin: 10rpx;
  }
}
</style>