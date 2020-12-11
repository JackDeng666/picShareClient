<template>
	<view>
		<view class="u-flex user-box u-p-l-10 u-p-r-20 u-p-b-10" @click="go">
			<view class="u-m-r-10">
				<u-avatar :src="userInfo.avatar" size="140"></u-avatar>
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

		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item icon="close" title="退出登录" :border-bottom="false" @click="logout"></u-cell-item>
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
			},
			getData(){
				let data = uni.getStorageSync('userInfo')
				if(data == ''){
					this.userInfo = null
				} else {
					this.userInfo = data.userInfo
				}
			},
			logout(){
				uni.setStorageSync('userInfo', '')
				this.getData()
			}
		},
		onShow(){
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
.user-box{
	background-color: #fff;
}
</style>
