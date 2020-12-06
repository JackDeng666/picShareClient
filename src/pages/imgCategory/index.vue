<template>
<view class="wrap">
  <view class="u-tabs-box" style="z-index: 0;">
		<u-tabs-swiper activeColor="#d4237a" ref="tabs" :list="items" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	</view>

  <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<picList1 :cid="id" type="byCategory" order="new" />
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList1 :cid="id" type="byCategory" order="hot" />
		</swiper-item>
	</swiper>

</view>
</template>

<script>
import picList1 from "../../components/picList1"
export default {
	components: {
    picList1
	},
	data() {
		return {
			items: [{name: "最新"},{name: "热门"}],
      current: 0,
      swiperCurrent: 0,
      id: 0
		}
	},
	methods: {
		change(index) {
			this.swiperCurrent = index
    },
    transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
  },
  onLoad(options){
		this.id = options.id
		uni.setNavigationBarTitle({title: options.name + '分类'})
  }
}
</script>

<style lang="scss">
// .tab_title{
//   background-color: #fff;
//   .tab{
//     width: 60%;
//     margin: 0 auto;
//   }
// }
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
