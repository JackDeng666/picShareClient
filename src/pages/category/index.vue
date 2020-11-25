<template>
<view class="category_box">
	<navigator 
		class="cate_item"
		v-for="item in category"
		:key="item.id"
		:url="`/pages/imgCategory/index?id=${item.id}&name=${item.name}`">
		<image :src="item.cover" mode="aspectFill"></image>
		<view class="cate_name">{{item.name}}</view>
	</navigator>
	<tab-bar :current="3"></tab-bar>
</view>
</template>

<script>
export default {
	data() {
		return {
			category: []
		}
	},
	methods: {
		async getList(){
			let res = await this.request({
				url: 'https://service.picasso.adesk.com/v1/vertical/category'
			})
			this.category = res.res.category
		}
	},
	onLoad(){
		this.getList()
	}
}
</script>

<style lang="scss">
.category_box {
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 98rpx;
  .cate_item {
		width: 33.33%;
		position: relative;
		border: 5rpx solid #fff;
    image {
			height: 240rpx;
    }
    .cate_name {
			position: absolute;
			width: 100%;
			height: 50rpx;
			left: 0;
			bottom: 0;
			color: #fff;
			background-image: linear-gradient(to right top, rgba(0,0,0,.2),rgba(0,0,0,0));
			font-size: 40rpx;
			display: flex;
			align-items: center;
			padding-left: 20rpx;
    }
  }
}
</style>
