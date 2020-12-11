<template>
<view class="category_box">
	<navigator 
		class="cate_item"
		v-for="item in categorys"
		:key="item.categoryId"
		:url="`/pages/imgCategory/index?id=${item.categoryId}&name=${item.categoryName}`">
		<image :src="item.signUrl" mode="aspectFill"></image>
		<view class="cate_name">{{item.categoryName}}</view>
	</navigator>
	<tab-bar :current="3"></tab-bar>
</view>
</template>

<script>
export default {
	data() {
		return {
			categorys: []
		}
	},
	methods: {
		async getList(){
			let res = await this.$u.api.picture.getCategory()
			res.data.forEach(el => {
				el.signUrl = this.$basicUrl + el.signUrl
			})
			this.categorys = res.data
		}
	},
	onLoad(){
		this.getList()
	}
}
</script>

<style lang="scss">
page {
	background-color: #fff;
	height: 100%;
}
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
