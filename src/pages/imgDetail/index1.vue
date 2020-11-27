<template>
<view>
 <!-- 用户信息开始 -->
  <view class="user_info">
    <!-- <view class="user_icon">
      <image :src="imgDetail.user.avatar" mode="widthFix"></image>
    </view> -->
    <!-- <view class="user_desc">
      <view class="user_name">{{imgDetail.user.name}}</view>
      <view class="user_time">{{imgDetail.cnTime}}</view>
    </view> -->
  </view>
  <!-- 用户信息结束 -->
  <!-- 高清大图开始 -->
  <view class="high_img">
    <swiper-action @swiperAction="handleSiperAction">
      <image :src="imgDetail.thumb" mode="widthFix"></image>
    </swiper-action>
  </view>
  <!-- 高清大图结束 -->
  <!-- 点赞开始 -->
  <view class="user_rank">
    <view class="rank">
      <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
    </view>
    <view class="user_collect">
      <text class="iconfont iconshoucang">收藏</text>
    </view>
  </view>
  <!-- 点赞结束 -->
  <!-- 专辑开始 -->
  <view class="album_wrap" v-if="album.length">
    <view class="album_title">相关</view>
    <view class="album_list">
      <view class="album_item" v-for="item in album" :key="item.id">
        <view class="album_cover">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="album_info">
          <view class="album_info_text">专辑</view>
          <view class="album_name">{{item.name}}</view>
          <text class="iconfont iconjiantou"></text>
        </view>
      </view>
    </view>
  </view>
  <!-- 专辑结束 -->
  <!-- 最热评论开始 -->
  <view class="comment hot" v-if="hot.length">
    <view class="comment_title">
      <view class="iconfont iconhot1"></view>
      <view class="comment_text">最热评论</view>
    </view>
    <view class="comment_list">
      <view class="comment_item" v-for="item in hot" :key="item.id">
        <!-- 用户信息 -->
        <view class="comment_user">
          <view class="user_icon">
            <image :src="item.user.avatar" mode="widthFix"></image>
          </view>
          <view class="user_nickname">{{item.user.name}}</view>
          <view class="user_time">{{item.cnTime}}</view>
        </view>
        <!-- 评论数据 -->
        <view class="comment_desc">
          <view class="comment_content">{{item.content}}</view>
          <view class="comment_like">
            <text class="iconfont icondianzan">{{item.size}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 最热评论结束 -->
   <!-- 最新评论开始 -->
  <view class="comment new" v-if="comment.length">
    <view class="comment_title">
      <view class="iconfont iconpinglun"></view>
      <view class="comment_text">最新评论</view>
    </view>
    <view class="comment_list">
      <view class="comment_item" v-for="item in comment" :key="item.id">
        <!-- 用户信息 -->
        <view class="comment_user">
          <view class="user_icon">
            <image :src="item.user.avatar" mode="widthFix"></image>
          </view>
          <view class="user_nickname">{{item.user.name}}</view>
          <view class="user_time">{{item.cnTime}}</view>
        </view>
        <!-- 评论数据 -->
        <view class="comment_desc">
          <view class="comment_content">{{item.content}}</view>
          <view class="comment_like">
            <text class="iconfont icondianzan">{{item.size}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 最新评论结束 -->
  <!-- 下载按钮开始 -->
  <view class="download">
    <view class="download_btn" @click="handleDownload">下载图片</view>
  </view>
  <!-- 下载按钮结束 -->
</view>
</template>

<script>
import moment from "moment"
moment.locale("zh-cn")
import swiperAction from "../../components/swiperAction"
export default {
  data() {
    return {
      imgDetail: {},
      album: [],
      hot: [],
      comment: [],
      imgIndex: 0
    }
  },
  components: {
    swiperAction
  },
  methods: {
    getComments(id){
      this.request({
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`
      }).then(res => {
        this.album = res.res.album
        res.res.hot.forEach(v => {
          v.cnTime = moment(v.atime*1000).fromNow()
        });
        res.res.comment.forEach(v => {
          v.cnTime = moment(v.atime*1000).fromNow()
        });
        this.hot = res.res.hot
        this.comment = res.res.comment
      })
    },
    // 大图滑动
    handleSiperAction(e){
      const {imgList} = getApp().globalData
      if(e.direction === "left"){
        if(this.imgIndex === imgList.length - 1){
          this.imgIndex = 0
          uni.showToast({
            title: "回到第一页",
            icon: "none"
          })
        } else {
          this.imgIndex += 1
        }
      }
      if(e.direction === "right"){
        if(this.imgIndex === 0){
          this.imgIndex = imgList.length - 1
          // 被覆盖了
          uni.showToast({
            title: "取到最后一页",
            icon: "none",
            position: "top"
          })
        } else {
          this.imgIndex -= 1
        }
      }
      this.getData()
    },
    getData(){
      const {imgList} = getApp().globalData
      this.imgDetail = imgList[this.imgIndex]
      this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow()
      this.getComments(this.imgDetail.id)
    },
    async handleDownload(){
      await uni.showToast({
        title: "下载中..."
      })
      // 下载到小程序内存
      let res = await uni.downloadFile({
        url: this.imgDetail.img
      })
      console.log(res)
      let {tempFilePath} = res[1]
      // 将内存中的文件下到本地
      let res2 = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath
      })
      console.log(res2)
      await uni.showToast({
        title: "下载成功"
      })
    }
  },
  onLoad(){
    const {imgIndex} = getApp().globalData
    this.imgIndex = imgIndex
    this.getData()
  }
}
</script>

<style lang="scss">
.user_info {
  display: flex;
  padding: 20rpx;
  height: 100rpx;
  .user_icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }
  .user_desc {
    .user_name {
      color: #000;
      font-weight: bold;
    }
    .user_time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {

    }
  }
  .user_collect {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {

    }
  }
}
.album_wrap {
  padding: 20rpx;
  .album_title {
    padding: 10rpx 0;
  }

  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;
      .album_cover {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .album_name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont{
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #000;
        }
      }
    }
  }
}
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont.iconhot1 {
      color: red;
      font-size: 40rpx;
    }
    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eee;
      .comment_user {
        display: flex;
        padding: 20rpx 0;
        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }
        .user_nickname {
          color: #777;
        }
        .user_time {
          color: #ccc;
          font-size: 24rpx;
          padding: 5rpx;
        }
      }
      .comment_desc {
        display: flex;
        padding: 30rpx 0;
        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }
        .comment_like {
          text-align: right;
        }
      }
    }
  }
}
.new {
  .iconpinglun{
    color: aqua!important;
  }
}
.download{
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download_btn{
    width: 90%;
    height: 85%;
    background-color: $color;
    color: #fff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>