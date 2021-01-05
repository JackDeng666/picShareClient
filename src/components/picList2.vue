<template>
	<scroll-view scroll-y :style="{height: heightText}" @scrolltolower="handleScrolltolower">
		<u-waterfall v-model="flowList">
			<template v-slot:left="{leftList}">
				<view v-for="item in leftList" :key="item.picListId">
					<go-detail :list="item.pictures" :index="0" type="list">
						<view class="panel">
							<image class="card-img" :src="item.pictures[0].thumbnailUrl" mode="aspectFill"></image>
							<text class="card-num-view">{{item.pictures.length}}P</text>
							<view class="card-bottm">
								<view class="car-title-view">
									<u-tag :text="tag.category.categoryName" shape="circle" mode="dark" v-for="tag in item.tags" :key="tag.tagId"/>
									<text class="card-title">{{item.picListName}}</text>
								</view>
							</view>
						</view>
					</go-detail>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view v-for="item in rightList" :key="item.picListId">
					<go-detail :list="item.pictures" :index="0" type="list">
						<view class="panel">
							<image class="card-img" :src="item.pictures[0].thumbnailUrl" mode="aspectFill"></image>
							<text class="card-num-view">{{item.pictures.length}}P</text>
							<view class="card-bottm">
								<view class="car-title-view">
									<u-tag :text="tag.category.categoryName" shape="circle" mode="dark" v-for="tag in item.tags" :key="tag.tagId"/>
									<text class="card-title">{{item.picListName}}</text>
								</view>
							</view>
						</view>
					</go-detail>
				</view>
			</template>
		</u-waterfall>
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
			heightText: "calc(100vh - 36px - 100rpx)",
			params: {
        currentPage: 1,
        pageSize: 10,
        type: "new",
        enable: 1
      },
			flowList: [],
			hasMore: true
		}
	},
	methods: {
		handleScrolltolower(){
			if(this.hasMore){
        this.params.currentPage += 1,
        this.getData()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
		},
		async getData() {
			let res = await this.$u.api.picture.getPicSetList(this.params)
			console.log(res)
			res.data.forEach(ele => {
				ele.pictures.forEach(el => {
					el.thumbnailUrl = this.$basicUrl + el.thumbnailUrl
        	el.odUrl = this.$basicUrl + el.odUrl
				})
      })
			let data = res.data.filter(el => {
				return el.pictures.length > 0
			})
			console.log(data)
			if(data.length === 0){
        this.hasMore = false
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
        return
      }
			this.flowList.push(...data)
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
	mounted() {
		this.init()
		this.getData()
	}
}
</script>

<style>
.panel {
	position: relative;
	border-radius: 10rpx;
	overflow: hidden;
	background-color: #FFFFFF;
	margin: 10rpx;
	width: 355rpx;
}

.card-num {
	color: #FFFFFF;
	font-size: 13px;
	text-align: center;
}
.u-tag{
	margin: 0 5rpx;
}
.card-num-view {
	background-color: #FF80AB;
	line-height: 1;
	display: inline-block;
	padding: 3px 6px;
	color: #FFFFFF;
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
}

.card-bottm {
	justify-content: center;
	align-items: center;
}

.car-title-view {
	flex: 1;
	padding: 14upx 0upx 14upx 20upx;
}

.card-title {
	flex: 1;
	font-size: 28rpx;
	text-align: left;
	color: #555555;
	text-overflow: ellipsis;
	lines: 2;
	display: -webkit-box;
	white-space: normal;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	/* -webkit-line-clamp: 2; */
	overflow: hidden;
}
</style>
