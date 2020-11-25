<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar src="../../static/comical.png	" size="140"></u-avatar>
			</view>

			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">JackDeng</view>
				<view class="u-font-14 u-tips-color">dasdwfwqfwqfw</view>
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
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-box{
	background-color: #fff;
}
</style>
