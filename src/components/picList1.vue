<template>
<scroll-view scroll-y class="scroll" @scrolltolower="handleScrolltolower" v-if="picList.length > 0">
  <view class="content">
    <view class="item" v-for="(item,index) in picList" :key="item.id">
      <go-detail :list="picList" :index="index">
        <image :src="item.thumb" mode="widthFix"></image>
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
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      picList: [],
      hasMore: true
		}
	},
	methods: {
    async getList(){
      let res
      switch(this.type){
        case 'byCategory':
          this.params.order = this.order
          res = await this.request({
            url: `https://service.picasso.adesk.com/v1/vertical/category/${this.cid}/vertical`,
            data: this.params
          })
          break;
        case 'no':
          this.params.order = this.order  
          res = await this.request({
            url: "http://service.picasso.adesk.com/v3/homepage/vertical",
            data: this.params
          })
          break;
      }
      if(res.res.vertical.length === 0){
        this.hasMore = false
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
        return
      }
      this.picList.push(...res.res.vertical) 
    },
    handleScrolltolower(){
      if(this.hasMore){
        this.params.skip += this.params.limit,
        this.getList()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss">
.scroll {
  height: calc(100vh - 36px);
  .content {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.3%;
      border: 5rpx solid #222;
    }
  }
}
</style>
