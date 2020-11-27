<template>
	<view class="index">
		<swiper @change="swpierChange" :style="{height: screenHeight + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="value" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<view class="detail-btn-view">
			<view class="download" @click="download"></view>
			<view>ss</view>
			<view class="setting" @click="setting">设为壁纸</view>
			<!-- #ifdef APP-PLUS -->
			<view v-if="showBtn" class="setting" @click="setting">设为壁纸</view>
			<!-- #endif -->
			<view class="collect" @click="collect"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec: ""
			}
		},
		onLoad() {
      this.screenHeight = uni.getSystemInfoSync().windowHeight;
      let {tdata} = getApp().globalData
      console.log(tdata)
			this.detailDec = tdata;
			let data = JSON.parse(decodeURIComponent(tdata));
			console.log(data)
			this.imgLength = data.img_num;
			this.data.push(data.img_src);
			this.getData(data.id);
			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			})
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
			collect() {
				uni.showToast({
					icon: 'none',
					title: '点击收藏按钮'
				})
			},
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + '/' + this.imgLength
				})
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
			},
			getData(e) {
				uni.request({
					url: this.$serverUrl + '/api/picture/detail.php?id=' + e,
					success: (res) => {
						if (res.data.code !== 0) {
							uni.showModal({
								content: '请求失败，失败原因：' + res.data.msg,
								showCancel: false
							})
							return;
						}
						this.data = this.data.concat(res.data.data);
					},
					fail: () => {
						uni.showModal({
							content: '请求失败，请重试!',
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
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
		/* height: 1125rpx; */
	}
</style>
