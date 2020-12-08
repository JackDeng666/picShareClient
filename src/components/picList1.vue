<template>
<scroll-view scroll-y class="scroll" @scrolltolower="handleScrolltolower" v-if="picList.length > 0">
  <view class="content">
    <view class="item" v-for="(item,index) in picList" :key="item.id">
      <go-detail :list="picList" :index="index" type="single">
        <image :src="$basicUrl + item.thumbnailUrl" mode="aspectFill"></image>
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
        currentPage: 1,
        pageSize: 10,
        type: "new",
        enable: 0
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
          this.params.type = this.order
          this.params.categoryId = this.cid
          res = await this.$u.api.picture.getPicList(this.params)
          break;
        case 'no':
          this.params.order = this.order  
          res = await this.$u.api.picture.getPicList(this.params)
          break;
      }
      console.log(res)
      if(res.data.length === 0){
        this.hasMore = false
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
        return
      }
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
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss">
.scroll {
  height: calc(100vh - 36px - 190rpx);
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
