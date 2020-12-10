<template>
<view class="box">
  <view class="form_box">
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
      
      <u-form-item :label-position="labelPosition" label="分类" prop="categorys">
        <u-checkbox-group @change="checkboxGroupChange">
          <u-checkbox v-model="item.checked" v-for="(item, index) in selectList" :key="index" :name="item.categoryId">
            {{ item.categoryName }}
          </u-checkbox>
        </u-checkbox-group>
      </u-form-item>

    </u-form>
  </view>
  <u-button class="btn" type="success" @click="submit">前往</u-button>
</view>
</template>

<script>
export default {
  data() {
    return {
      model: {
				categorys: [],
      },
      labelPosition: 'left',
      border: true,
      errorType: ['message'],
			rules: {
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
          getApp().globalData.currentUploadData = this.model
          uni.redirectTo({
            url: `/pages/upload/index?type=0`
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