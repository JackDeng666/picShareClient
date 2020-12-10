<template>
<view class="wrap">
  <view class="u-tabs-box" style="z-index: 0;">
		<u-tabs-swiper activeColor="#d4237a" ref="tabs" :list="items" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	</view>

  <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<picList1 :cid="id" type="byCategory" order="hot" />
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList1 :cid="id" type="byCategory" order="new" />
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList2 :cid="id" type="byCategory" order="hot" />
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList2 :cid="id" type="byCategory" order="new" />
		</swiper-item>
	</swiper>

</view>
</template>

<script>
import picList1 from "../../components/picList1"
import picList2 from "../../components/picList2"
export default {
	components: {
		picList1,
		picList2
	},
	data() {
		return {
			items: [{name: "热门图片"},{name: "最新图片"},{name: "热门图集"},{name: "最新图集"}],
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
