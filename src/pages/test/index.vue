<template>
	<view class="index">
		<view class="grid">
			<view class="grid-c-06" v-for="item in lists" :key="item.guid">
				<view class="panel" @click="goDetail(item)">
					<image class="card-img card-list2-img" :src="item.img_src"></image>
					<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.title}}</text>
						</view>
						<view @click.stop="share(item)" class="card-share-view"></view>
					</view>
				</view>
			</view>
		</view>
		<text class="loadMore">加载中...</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				lists: [],
				fetchPageNum: 1
			}
		},
		onLoad() {
			this.getData();
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			this.getData();
		},
		methods: {
			getData() {
				uni.request({
					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) +
						'&per_page=10',
					success: (ret) => {
						console.log(ret)
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							if (this.refreshing && ret.data[0].id === this.lists[0].id) {
								uni.showToast({
									title: '已经最新',
									icon: 'none',
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							let list = [],
								data = ret.data;
							for (let i = 0, length = data.length; i < length; i++) {
								var item = data[i];
								item.guid = this.newGuid() + item.id
								list.push(item);
							}
							console.log('得到list', list);
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = list;
								this.fetchPageNum = 2;
							} else {
								this.lists = this.lists.concat(list);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			newGuid() {
				let s4 = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
				}
				return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../detail/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: e.title,
							imageUrl: e.img_src,
							href: 'https://uniapp.dcloud.io',
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
.grid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding-left: 5px;
	padding-right: 5px;
	box-sizing: border-box;
	padding-top: 10px;
}

.grid-c-01,
.grid-c-02,
.grid-c-03,
.grid-c-04,
.grid-c-05,
.grid-c-06,
.grid-c-07,
.grid-c-08,
.grid-c-09,
.grid-c-10,
.grid-c-11,
.grid-c-12 {
	position: relative;
	width: 100%;
	padding-left: 5px;
	padding-right: 5px;
	box-sizing: border-box;
}

.grid-c-auto {
	flex: 0 0 auto;
	width: auto;
	max-width: none;
}

.grid-c-fill {
	flex-basis: 0;
	flex: 1;
	flex-grow: 1;
	max-width: 100%;
}

.grid-c-none {
	flex: none;
}

.grid-c-01 {
	flex: 0 0 8.333333%;
	max-width: 8.333333%;
}

.grid-c-02 {
	flex: 0 0 16.666667%;
	max-width: 16.666667%;
}

.grid-c-03 {
	flex: 0 0 25%;
	max-width: 25%;
}

.grid-c-04 {
	flex: 0 0 33.333333%;
	max-width: 33.333333%;
}

.grid-c-05 {
	flex: 0 0 41.666667%;
	max-width: 41.666667%;
}

.grid-c-06 {
	flex: 0 0 50%;
	max-width: 50%;
}

.grid-c-07 {
	flex: 0 0 58.333333%;
	max-width: 58.333333%;
}

.grid-c-08 {
	flex: 0 0 66.666667%;
	max-width: 66.666667%;
}

.grid-c-09 {
	flex: 0 0 75%;
	max-width: 75%;
}

.grid-c-10 {
	flex: 0 0 83.333333%;
	max-width: 83.333333%;
}

.grid-c-11 {
	flex: 0 0 91.666667%;
	max-width: 91.666667%;
}

.grid-c-12 {
	flex: 0 0 100%;
	max-width: 100%;
}

.panel {
	position: relative;
	border-radius: 10upx;
	overflow: hidden;
	flex-direction: column;
	background-color: #FFFFFF;
	margin-bottom: 10px;
}

.card {
	position: relative;
	width: 710upx;
	margin: 20upx 20upx 20upx 20upx;
	border-radius: 10upx;
	overflow: hidden;
	flex-direction: column;
	background-color: #FFFFFF;
}

.card-img {
	width: 710upx;
	height: 1065upx;
}

.card-num {
	color: #FFFFFF;
	font-size: 13px;
	text-align: center;
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
	top: 20upx;
	right: 20upx;
}

.card-bottm {
	justify-content: center;
	align-items: center;
}

.card-share-view {
	justify-content: center;
	align-items: center;
	padding: 14upx 0;
	color: #FF80AB;
	margin: 20upx 20upx 20upx;
	font-size: 30upx;
	font-family: texticons;
}

.card-share-view:before {
	content: '\e62d';
}

.car-title-view {
	flex: 1;
	padding: 14upx 0upx 14upx 20upx;
}

.card-title {
	flex: 1;
	font-size: 30upx;
	text-align: left;
	color: #555555;
	text-overflow: ellipsis;
	lines: 2;
	display: -webkit-box;
	white-space: normal;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
</style>
