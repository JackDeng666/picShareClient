<template>
<view class="box">
  <view class="form_box">
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
      <u-form-item :label-position="labelPosition" label="包名" prop="picListName">
        <u-input :border="border" placeholder="请输入包名" v-model="model.picListName" type="text"></u-input>
      </u-form-item>
      <u-form-item :label-position="labelPosition" label="分类" prop="category">
        <u-input :border="border" type="select" placeholder="请选择分类" v-model="model.categoryName" :select-open="selectShow" @click="selectShow = true"></u-input>
      </u-form-item>
      <u-form-item :label-position="labelPosition" label="简介" prop="intro">
        <u-input :border="border" type="textarea" placeholder="请填写简介" v-model="model.intro" />
      </u-form-item>
    </u-form>
  </view>
  <u-select mode="single-column" :list="selectList" value-name="categoryId" label-name="categoryName" v-model="selectShow" @confirm="selectConfirm"></u-select>
  <u-button class="btn" type="success" @click="submit">提交</u-button>
</view>
</template>

<script>
export default {
  data() {
    return {
      model: {
				picListName: '',
				categoryName: null,
        intro: ''
      },
      labelPosition: 'left',
      border: true,
      errorType: ['message'],
			rules: {
				picListName: [
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
            trigger: ['blur']
					}
				]
      },
      selectShow: false,
      selectList: []
    }
  },
  methods: {
    async submit(){
      let data = uni.getStorageSync('userInfo')
      this.model.userId = data.userInfo.userId
      let res = await this.$u.api.picture.addPicList(this.model)
      if(res.status == 1688){
        uni.showToast({
          icon: 'none',
          title: '创建成功',
          duration: 1000
        })
        uni.navigateTo({
          url: `/pages/upload/index?type=1`
        })
      }
    },
    reset(){
      this.model.picListName = ''
      this.model.category = ''
      this.model.intro = ''
    },
    // 选择分类回调
		selectConfirm(e) {
      this.model.categoryName = e[0].label
      this.model.categoryId = e[0].value
		}
  },
  mounted(){
    this.$refs.uForm.setRules(this.rules)
    let {categorys} = getApp().globalData
    this.selectList = categorys
  }
}
</script>

<style lang="scss" scoped>
.box{
  background-color: #fff;
  height: 100vh;
  text-align: center;
  padding: 20rpx;
}
</style>