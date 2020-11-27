<template>
	<scroll-view scroll-y class="scroll" @scrolltolower="handleScrolltolower">
		<u-waterfall v-model="flowList">
			<template v-slot:left="{leftList}">
				<view v-for="item in leftList" :key="item.guid">
					<view class="panel" @click="goDetail(item)">
						<image class="card-img" :src="item.img_src"></image>
						<text class="card-num-view">{{item.img_num}}P</text>
						<view class="card-bottm">
							<view class="car-title-view">
								<text class="card-title">{{item.title}}</text>
								<text class="card-title">{{item.guid}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view v-for="item in rightList" :key="item.guid">
					<view class="panel" @click="goDetail(item)">
						<image class="card-img" :src="item.img_src"></image>
						<text class="card-num-view">{{item.img_num}}P</text>
						<view class="card-bottm">
							<view class="car-title-view">
								<text class="card-title">{{item.title}}</text>
								<text class="card-title">{{item.guid}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</u-waterfall>

		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="getData"></u-loadmore>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				refreshing: false,
				lists: [],
				fetchPageNum: 1,
				flowList: []
			}
		},
		created() {
			this.getData()
		},
		// onPullDownRefresh() {
		// 	console.log('下拉刷新');
		// 	this.refreshing = true;
		// 	this.getData();
		// },
		methods: {
      handleScrolltolower(){
        this.loadStatus = 'loading';
        // 模拟数据加载
        setTimeout(() => {
          this.getData();
          this.loadStatus = 'loadmore';
        }, 1000)
      },
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
								if(i == 0){
									item.guid = item.guid + "哒哒哒打打阿达嗒嗒嗒哒哒哒打打打答"
								}
								list.push(item)
							}
							console.log('得到list', list)
							if (this.refreshing) {
								this.refreshing = false
								uni.stopPullDownRefresh()
								this.lists = list
								this.flowList = list
								this.fetchPageNum = 2
							} else {
								this.lists = this.lists.concat(list)
								this.flowList = this.flowList.concat(list)
								this.fetchPageNum += 1
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
				console.log(e)
				uni.navigateTo({
					url: '../detail/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			}
		}
	}
</script>

<style>
.scroll {
  height: calc(100vh - 36px);
  margin-bottom: 100rpx;
}
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
