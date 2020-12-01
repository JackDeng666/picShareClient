<template>
	<view>
		<swiper @change="swpierChange" :current="index" :style="{height: screenHeight + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="value" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<view :class="isShowBtn ? 'detail-btn-view' : 'detail-btn-view hide'">
			<u-icon :color="iconColor" :size="iconSize" name="photo" label="显示原图" :label-color="iconColor"></u-icon>
			<u-icon @click="download" hover-class="pre" name="download" label="下载图片" :color="iconColor" :label-color="iconColor" :size="iconSize"></u-icon>
			<u-icon @click="praise" hover-class="pre" name="thumb-up" label="5465" :color="iconColor" :size="iconSize" :label-color="iconColor"></u-icon>
			<u-icon @click="collect" hover-class="pre" name="star" label="5465" :color="iconColor" :size="iconSize" :label-color="iconColor"></u-icon>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec: "",
				isShowBtn: true,
				iconColor: "white",
				iconSize: 44,
				iconTimer: null
			}
		},
		onLoad() {
      this.screenHeight = uni.getSystemInfoSync().windowHeight
      let {imgList,imgIndex} = getApp().globalData
      this.index = imgIndex
			this.imgLength = imgList.length;
			for(let i = 0; i < imgList.length; i++){
				this.data.push(imgList[i].thumb)
			}
			uni.setNavigationBarTitle({
				title: `${this.index}/${this.imgLength}`
			})

			console.log(this.index)
		},
		methods: {
			download() {
				uni.downloadFile({
					url: this.data[this.index],
					success: (e) => {
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: () => {
								uni.showToast({
									icon: 'none',
									title: '已保存到手机相册'
								})
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									title: '保存到手机相册失败'
								})
							}
						});
					},
					fail: (e) => {
						uni.showModal({
							content: '下载失败，' + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			praise(){
				uni.showToast({
					icon: 'none',
					title: '点击点赞按钮'
				})
			},
			collect() {
				uni.showToast({
					icon: 'none',
					title: '点击收藏按钮'
				})
			},
			swpierChange(e) {
				// 底部动画
				clearTimeout(this.iconTimer)
				this.isShowBtn = false
				this.iconTimer = setTimeout(() => {
					this.isShowBtn = true
				}, 1000)

				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + '/' + this.imgLength
				})

				console.log(this.index)
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index],
						urls: this.data
					})
				}, 150)
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #000;
	height: 100%;
}
swiper {
	flex: 1;
	width: 750upx;
	background-color: #000;
	display: flex;
	flex-direction: column;
}
swiper-item {
	display: flex;
	align-items: center;
}
image {
	width: 750rpx;
}
.detail-btn-view{
	display: flex;
	width: 750rpx;
	position: fixed;
	bottom: 20rpx;
	justify-content:  space-around;
	transition: .5s;
}
.detail-btn-view.hide{
	bottom: -54rpx;
}
.pre{
	color: #eee;
	font-size: 40rpx;
}
</style>
