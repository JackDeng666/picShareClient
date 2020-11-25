<template>
<view>
  <view class="up_box">

    <view class="form_box" v-if="type==1">
      <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
        <u-form-item :label-position="labelPosition" label="包名" prop="packageName">
          <u-input :border="border" placeholder="请输入包名" v-model="model.packageName" type="text"></u-input>
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="分类" prop="category">
          <u-input :border="border" type="select" placeholder="请选择分类" v-model="model.category" :select-open="selectShow" @click="selectShow = true"></u-input>
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="简介" prop="intro">
          <u-input :border="border" type="textarea" placeholder="请填写简介" v-model="model.intro" />
        </u-form-item>
      </u-form>
    </view>
    <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
    
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
      labelPosition: 'left',
      border: true,
      errorType: ['message'],
			rules: {
				packageName: [
					{
						required: true,
						message: '请输入包名',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 30,
						message: '姓名长度在2到30个字符',
						trigger: ['change','blur']
					}
				],
				category: [
					{
						required: true,
            message: '请选择分类',
            trigger: ['change','blur']
					}
				]
      },
      selectShow: false,
      selectList: [
				{
					id: 1,
					label: '美女'
				},
				{
					id: 2,
					label: '动画'
				},
				{
					id: 3,
					label: '游戏'
				}
			]
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
    },
    reset(){
      this.model.packageName = ''
      this.model.category = ''
      this.model.intro = ''
    },
    // 选择分类回调
		selectConfirm(e) {
      this.model.category = ''
      // 多列模式一波获取写法
			e.map((val, index) => {
				this.model.category += this.model.category == '' ? val.label : '-' + val.label
			})
		}
  },
  mounted(){
    if(this.type==1){
      this.$refs.uForm.setRules(this.rules)
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