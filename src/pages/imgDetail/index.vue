<template>
	<view>
		<swiper @change="swpierChange" :current="index" :style="{height: screenHeight + 'px'}" v-if="isShowSwiper">
			<swiper-item v-for="(value, index) in data" :key="index" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<view :class="isShowBtn ? 'detail-btn-view' : 'detail-btn-view hide'">
			<u-icon @click="showOd" :color="iconColor" :size="iconSize" name="photo" :label="labelShow" :label-color="iconColor"></u-icon>
			<u-icon @click="download" hover-class="pre" name="download" label="下载图片" :color="iconColor" :label-color="iconColor" :size="iconSize"></u-icon>
			<u-icon @click="praise" hover-class="pre" name="thumb-up-fill" :label="praiseNum" :color="pColor" :size="iconSize" :label-color="pColor"></u-icon>
			<u-icon @click="collect" hover-class="pre" name="star-fill" :label="collectNum" :color="cColor" :size="iconSize" :label-color="cColor"></u-icon>
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
				data: [],
				imgList: [],
				isShowBtn: true,
				iconColor: "white",
				iconSize: 44,
				iconTimer: null,
				isShowSwiper: true,
				userId: 0,
				pColor: '#d52a7e',
				cColor: '#d52a7e',
			}
		},
		onLoad() {
      this.screenHeight = uni.getSystemInfoSync().windowHeight
			let {imgList,imgIndex} = getApp().globalData
			this.imgList = imgList
      this.index = imgIndex
			this.imgLength = imgList.length;
			for(let i = 0; i < imgList.length; i++){
				this.data.push(this.$basicUrl + imgList[i].thumbnailUrl)
				this.imgList[i].isTumb = true 
			}
			uni.setNavigationBarTitle({
				title: `${this.index+1}/${this.imgLength}`
			})
			let data = uni.getStorageSync('userInfo')
			if(data == ''){
				this.userId = 0
			} else {
				this.userId = data.userInfo.userId
			}
			this.getPraiseAndCollectInfo()
		},
		computed: {
			labelShow() {
				return this.imgList[this.index].isTumb ? '显示原图' : '显示缩略图'
			},
			praiseNum(){
				return this.imgList[this.index].praiseNum
			},
			collectNum(){
				return this.imgList[this.index].collectNum
			}
		},
		methods: {
			showOd(){
				if(this.imgList[this.index].isTumb){
					this.data.splice(this.index, 1, this.$basicUrl + this.imgList[this.index].odUrl)
					this.imgList[this.index].isTumb = false 
					let o = this.imgList[this.index]
					this.$set(this.imgList,this.index,o)
				} else {
					this.data.splice(this.index, 1, this.$basicUrl + this.imgList[this.index].thumbnailUrl)
					this.imgList[this.index].isTumb = true 
					let o = this.imgList[this.index]
					this.$set(this.imgList,this.index,o)
				}
				this.$set(this.imgList,'xx','xx')
				// 重现
				this.isShowSwiper = false
				this.$nextTick(() => {
					this.isShowSwiper = true
				})
			},
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
			check(){
				let data = uni.getStorageSync('userInfo')
				if(this.userId == 0){
					uni.showToast({
						icon: 'none',
						title: '请先登录',
						duration: 1000
					})
					return false
				}
				return true
			},
			async praise(){
				if(this.check()){
					let res = await this.$u.api.statistics.togglePraise({
						userId: this.userId,
						pictureId: this.imgList[this.index].pictureId
					})
					if(res.data.isCancel == 0){
						this.imgList[this.index].praiseNum += 1
						this.pColor = '#d52a7e'
					} 
					if(res.data.isCancel == 1) {
						this.imgList[this.index].praiseNum -= 1
						this.pColor = 'white'
					}
				}
			},
			async collect() {
				if(this.check()){
					let res = await this.$u.api.statistics.toggleCollect({
						userId: this.userId,
						ojectId: this.imgList[this.index].pictureId,
						objectType: 1
					})
					if(res.data.isCancel == 0){
						this.imgList[this.index].collectNum += 1
						this.cColor = '#d52a7e'
					} 
					if(res.data.isCancel == 1) {
						this.imgList[this.index].collectNum -= 1
						this.cColor = 'white'
					}
				}
			},
			async getPraiseAndCollectInfo(){
				let res = await this.$u.api.statistics.getPraiseAndCollectInfo({
					userId: this.userId,
					pictureId: this.imgList[this.index].pictureId,
				})
				if(res.data.praiseInfo == undefined){
					this.pColor = 'white'
				} else if(res.data.praiseInfo.isCancel == 0){
					this.pColor = '#d52a7e'
				} else {
					this.pColor = 'white'
				}
				if(res.data.collectInfo == undefined){
					this.cColor = 'white'
				} else if(res.data.collectInfo.isCancel == 0){
					this.cColor = '#d52a7e'
				} else {
					this.cColor = 'white'
				}
				this.imgList[this.index].praiseNum = res.data.pictureInfo.praiseNum
				this.imgList[this.index].collectNum = res.data.pictureInfo.collectNum
			},
			swpierChange(e) {
				// 底部动画
				clearTimeout(this.iconTimer)
				this.isShowBtn = false
				this.iconTimer = setTimeout(() => {
					this.getPraiseAndCollectInfo()
					this.isShowBtn = true
				}, 1000)

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
	width: 750rpx;
	background-color: #000;
	display: flex;
	flex-direction: column;
}
swiper-item {
	display: flex;
	align-items: center;
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
