<template>
<view class="wrap">
  <view class="u-tabs-box" style="z-index: 0;">
		<u-tabs-swiper activeColor="#d4237a" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	</view>

  <swiper v-if="show" class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<picList2 type="no" order="hot"/>
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList2 type="no" order="new"/>
		</swiper-item>
	</swiper>

  <tab-bar :current="1"></tab-bar>
</view>
</template>

<script>
import picList2 from "../../components/picList2"
export default {
  components: {
    picList2
  },
  data() {
    return {
      list: [
        {
          name: '最热'
        }, {
          name: '最新'
        }
      ],
      current: 0,
      swiperCurrent: 0,
      show: true
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
  onPullDownRefresh() {
    this.show = false
    setTimeout(() => {
      this.show = true
      uni.stopPullDownRefresh()
    }, 1000)
  }
}
</script>

<style lang="scss">
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>