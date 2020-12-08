<template>
<view class="tab-bar">
  <u-popup v-model="show" mode="top" length="30%">
    <share></share>
  </u-popup>
  <view v-for="(item, index) in list" :key="index" :class="['tab-bar-item', item.bulge ? 'bulge' : '']" :data-path="item.pagePath" :data-index="index" @click="switchTab">
    <view v-if="item.bulge" class="tab-bar-bulge tab-bar-view"></view>
    <image 
      :class="['image', current === index ? 'active' : '', show ? 'share_active':'']" 
      :src="current === index ? item.selectedIconPath : item.iconPath">
    </image>
    <view  v-if="item.text" :style='{color: current == index ? selectedColor : color}' class="tab-bar-view">{{item.text}}</view>
  </view>
</view>
</template>

<script>
import share from './share'
export default {
  props: {
    current: {
      type: [String, Number],
      default: 0
    }
  },
  components: {
    share
  },
  data() {
    return {
      show: false,
      color: "#8a8a8a",
      selectedColor: "#d4237a",
      backgroundColor: "#ffffff",
      list: [
        {
          pagePath: "/pages/img/index",
          iconPath: "/static/img.png",
          selectedIconPath: "/static/img_active.png",
          text: "图片"
        },
        {
          pagePath: "/pages/package/index",
          text: "图包",
          iconPath: "/static/package.png",
          selectedIconPath: "/static/package_active.png"
        },
        {
          pagePath: "/pages/share/index",
          bulge: true,
          text: "分享",
          iconPath: "/static/share_active.png",
          selectedIconPath: "/static/share_active.png"
        },
        {
          pagePath: "/pages/category/index",
          text: "分类",
          iconPath: "/static/category.png",
          selectedIconPath: "/static/category_active.png"
        },
        {
          pagePath: "/pages/person/index",
          iconPath: "/static/user.png",
          selectedIconPath: "/static/user_active.png",
          text: "个人"
        }
      ]
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if(data.index == 2){
        this.show = true
      } else {
        wx.switchTab({url})
      }
    }
  },
  mounted(){  
    uni.hideTabBar()
  }
}
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #FFF;
  display: flex;
  line-height: 1.2;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid #e6e6e6;
  box-shadow: 0 -1px 1px rgba(0,0,0,.05);
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.tab-bar-item .image {
  width: 50rpx;
  height: 50rpx;
}
.tab-bar-item .tab-bar-view {
  font-size: 10px;
}
.bulge {
  background-color: #FFF;
}
.bulge .tab-bar-bulge {
  position: absolute;
  z-index: -1;
  top: -40rpx;
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  border-top: 1px solid #e6e6e6;
  background-color: #FFF;
  box-shadow: 0 -1px 2px rgba(0,0,0,.05);
}
.bulge .image{
  position: absolute;
  width: 90rpx;
  height: 90rpx;
  top: -35rpx;
  transition: all .5s;
}
.bulge .share_active {
  transform: rotate(45deg);
}
.bulge .tab-bar-view {
  position: absolute;
  bottom: 10rpx;
  font-size: 12px;
}
</style>