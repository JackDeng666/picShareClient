<template>
<view>
  <view class="up_box">

    <view class="form_box" v-if="type==1">
      得到
    </view>
    <!-- <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select> -->
    
    <u-upload 
      ref="uUpload"
      :action="action"
      :form-data="model"
      :auto-upload="false"
      :max-size="5 * 1024 * 1024" 
      :max-count="maxCount"
      @on-uploaded="allOk"
      @on-success="onSuc">
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
      action: URL + 'picture/addPic', // 上传地址
      maxCount: 1,
      model: {
				packageName: '',
				category: '',
        intro: ''
      },
    }
  },
  methods: {
    allOk(lists, name){
      uni.hideLoading()
    },
    uploadSubmit() {
      uni.showLoading({
        title: '上传中...'
      })
      this.$refs.uUpload.upload()
    },
    clearList(){
     this.$refs.uUpload.clear()
    },
    back(){
      uni.navigateBack()
    }
  },
  mounted(){
    if(this.type==1){
      this.maxCount = 50
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