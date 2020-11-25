<template>
	<view>
		<view class="u-flex user-box u-p-l-10 u-p-r-20 u-p-b-10" @click="go">
			<view class="u-m-r-10">
				<u-avatar :src="userInfo == null ? '../../static/comical.png'	: userInfo.avatar" size="140"></u-avatar>
			</view>

			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo == null ? '未登陆'	: userInfo.name}}</view>
				<view class="u-font-14 u-tips-color">{{userInfo == null ? '点击登陆'	: userInfo.email}}</view>
			</view>

			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item icon="photo" title="我的单图" :border-bottom="false"></u-cell-item>
				<u-cell-item icon="moments" title="我的图集" :border-bottom="false"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item icon="heart" title="收藏图片" :border-bottom="false"></u-cell-item>
				<u-cell-item icon="star" title="收藏图集" :border-bottom="false"></u-cell-item>
			</u-cell-group>
		</view>

		<tab-bar :current="4"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			go(){
				if(this.userInfo == null){
					uni.navigateTo({
						url: `/pages/person/login`
					})
				} else {

				}
			}
		},
		onLoad(){
			// uni.setStorageSync('userInfo', '{"avatar":"https://anotherbug.cn/img/favicon.73a3d704.png","name":"JackDeng","email":"1556393081@qq.com"}')
			uni.setStorageSync('userInfo', '')
			let data = uni.getStorageSync('userInfo')
			if(data == ''){
				this.userInfo = null
				console.log("没有")
			} else {
				this.userInfo = JSON.parse(data)
				console.log(this.userInfo)
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-box{
	background-color: #fff;
}
</style>
