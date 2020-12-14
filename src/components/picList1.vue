<template>
<scroll-view scroll-y :style="{height: heightText}" @scrolltolower="handleScrolltolower" v-if="picList.length > 0">
  <view class="content">
    <view class="item" v-for="(item,index) in picList" :key="item.id">
      <go-detail :list="picList" :index="index" type="single">
        <image :src="item.thumbnailUrl" mode="aspectFill"></image>
      </go-detail>
    </view>
  </view>
</scroll-view>
</template>

<script>
import goDetail from "./goDetail"
export default {
	components: {
    goDetail
  },
  props: {
    type: String,
    cid: String,
    order: String
  },
	data() {
		return {
      heightText: 'calc(100vh - 36px - 100rpx)',
      params: {
        currentPage: 1,
        pageSize: 15,
        type: "new",
        enable: 0
      },
      picList: [],
      hasMore: true
		}
	},
	methods: {
    async getList(){
      let res = await this.$u.api.picture.getPicList(this.params)
      console.log(res)
      if(res.data.length === 0){
        this.hasMore = false
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
        return
      }
      res.data.forEach(el => {
        el.thumbnailUrl = this.$basicUrl + el.thumbnailUrl
        el.odUrl = this.$basicUrl + el.odUrl
      })
      this.picList.push(...res.data) 
    },
    handleScrolltolower(){
      if(this.hasMore){
        this.params.currentPage += 1,
        this.getList()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
    },
    init(){
      switch(this.type){
        case 'byCategory':
          this.params.type = this.order
          this.params.categoryId = this.cid
          this.heightText = "calc(100vh - 36px)"
          break;
        case 'no':
          this.params.type = this.order
          this.heightText = "calc(100vh - 36px - 100rpx)"
          break;
      }
    }
  },
  mounted(){
    this.init()
    this.getList()
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 33.3%;
    border: 5rpx solid #222;
  }
}
</style>
