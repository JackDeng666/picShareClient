<template>
	<scroll-view @scrolltolower="handleToLower" class="scroll" scroll-y v-if="recommends.length > 0">
		
		<view class="recommend_wrap">
			<view class="recommend_item"
				v-for="item in recommends" :key="item.id">
				<image mode="widthFix" :src="item.thumb"></image>
			</view>
		</view>

		<view class="months_wrap">
			<view class="months_title">
				<view class="months_title_info">
					<view class="months_info">
						<text>{{months.DD}} / </text>
						{{months.MM}} 月
					</view>
					<view class="months_text">{{months.title}}</view>
				</view>
				<view class="months_title_more">更多 > </view>
			</view>
			<view class="months_content">
				<view class="months_item" v-for="(item,index) in months.items" :key="item.id">
					<go-detail :list="months.items" :index="index">
						<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import moment from "moment"
import goDetail from "../../components/goDetail"
export default {
	data() {
		return {
			// 推荐列表
			recommends: [],
			months: {},
			params: {
				limit: 30,
				order: "hot",
				skip: 0
			},
			hasMore: true
		}
	},
	components: {
		goDetail
	},
	methods: {
		// 滚动触底
		handleToLower(){
			if(this.hasMore){
				this.params.skip += this.params.limit
				this.getList()
			} else {
				uni.showToast({
					title: "没有数据了",
					icon: "none"
				})
			}
		},
		// 获取数据
		getList(){
			this.request({
				url: "http://service.picasso.adesk.com/v3/homepage/vertical",
				data: this.params
			}).then(res => {
				// 下一页还有没有
				if(res.res.vertical.length === 0){
					this.hasMore = false
					return
				}
				if(this.recommends.length === 0){
					// 第一次发送
					this.recommends = res.res.homepage[1].items
					this.months = res.res.homepage[2]
					this.months.MM = moment(this.months.stime).format("MM")
					this.months.DD = moment(this.months.stime).format("DD")
				}
			})
		}
	},
	mounted(){
		uni.setNavigationBarTitle({title:"首页"})
		this.getList()
	}
}
</script>

<style lang="scss">
.scroll{
	// height = 屏幕高减去头部标题
	height: calc(100vh - 96rpx);
}
.recommend_wrap{
	display: flex;
	flex-wrap: wrap;
	.recommend_item{
		width: 50%;
		border: srpx solid #fff;
	}
}
.months_wrap {
  .months_title {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
    .months_title_info {
			color: $color;
			font-size: 30rpx;
			font-weight: 600;
			display: flex;
      .months_info {
        text {
					font-size: 36rpx;
        }
      }
      .months_text {
				font-size: 34rpx;
				color: #666;
				margin-left: 30rpx;
      }
    }
    .months_title_more {
			font-size: 24rpx;
			color: $color;
    }
  }
  .months_content {
		display: flex;
		flex-wrap: wrap;
		.months_item{
			width: 33.3%;
			border: 5rpx solid #000;
		}
  }
}
.hots_wrap {
  .hots_title {
		padding: 20rpx;
    text {
			border-left: 20rpx solid $color;
			padding-left: 20rpx;
			font-size: 34rpx;
			font-weight: 600;
    }
  }
  .hots_content {
		display: flex;
		flex-wrap: wrap;
    .hot-item {
			width: 33.3%;
			border: 5rpx solid #000;
    }
  }
}
</style>
