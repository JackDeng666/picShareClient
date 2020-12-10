<template>
<view class="box">
  <view class="form_box">
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
      <u-form-item :label-position="labelPosition" label="名称" prop="picListName">
        <u-input :border="border" placeholder="请输入图集名称" v-model="model.picListName" type="text"></u-input>
      </u-form-item>
      <u-form-item :label-position="labelPosition" label="分类" prop="categorys">
        <u-checkbox-group @change="checkboxGroupChange">
          <u-checkbox v-model="item.checked" v-for="(item, index) in selectList" :key="index" :name="item.categoryId">
            {{ item.categoryName }}
          </u-checkbox>
        </u-checkbox-group>
      </u-form-item>
      <u-form-item :label-position="labelPosition" label="简介" prop="intro">
        <u-input :border="border" type="textarea" placeholder="请填写简介" v-model="model.intro" />
      </u-form-item>
    </u-form>
  </view>
  <u-button class="btn" type="success" @click="submit">提交</u-button>
</view>
</template>

<script>
export default {
  data() {
    return {
      model: {
				picListName: '',
				categorys: [],
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
						message: '长度在2到30个字符',
						trigger: ['change','blur']
					}
				],
				categorys: [
          {
            validator: (rule, value, callback) => {
              return value.length > 0
            },
            message: '请选择至少一个分类',
            // 触发器可以同时用blur和change
            trigger: ['change','blur'],
          }
				]
      },
      selectList: []
    }
  },
  methods: {
    async submit(){
      this.$refs.uForm.validate(async valid => {
        if (valid) {
          let data = uni.getStorageSync('userInfo')
          this.model.userId = data.userInfo.userId
          let res = await this.$u.api.picture.addPicList(this.model)
          if(res.status == 1688){
            uni.showToast({
              icon: 'none',
              title: '创建成功',
              duration: 1000
            })
            getApp().globalData.currentUploadData = res.data
            uni.redirectTo({
              url: `/pages/upload/index?type=1`
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '创建失败' + res.msg,
              duration: 1000
            })
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: '验证失败',
            duration: 1000
          })
        }
      })
    },
    checkboxGroupChange(e) {
      this.model.categorys = e
    },
    initData(){
      let {categorys} = getApp().globalData
      this.selectList = JSON.parse(JSON.stringify(categorys))
    }
  },
  mounted(){
    this.$refs.uForm.setRules(this.rules)
    this.initData()
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