<template>
<view class="wrap">
  <view class="u-tabs-box" style="z-index: 0;">
		<u-tabs-swiper activeColor="#d4237a" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	</view>

  <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<home/>
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList1 type="no" order="new"/>
		</swiper-item>
		<swiper-item class="swiper-item">
			<picList1 type="no" order="hot"/>
		</swiper-item>
	</swiper>
  
  <tab-bar :current="0"></tab-bar>
</view>
</template>

<script>
import home from "./home"
import picList1 from "../../components/picList1"
export default {
  components: {
    home,
    picList1
  },
  data() {
    return {
      list: [
        {
          name: '首页'
        },
        {
          name: '最热'
        }, {
          name: '最新'
        }
      ],
      current: 0,
			swiperCurrent: 0,
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
  async onLoad(){
    let res = await this.$u.api.picture.getCategory()
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