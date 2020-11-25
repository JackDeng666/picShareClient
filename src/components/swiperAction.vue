<template>
  <view
    @touchstart="handleTouchstart"
    @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0,
      startX: 0,
      startY: 0
    }
  },
  methods: {
    handleTouchstart(e){
      this.startTime = Date.now()
      this.startX = e.changedTouches[0].clientX
      this.startY = e.changedTouches[0].clientY
    },
    handleTouchend(e){
      let endTime = Date.now()
      let endX = e.changedTouches[0].clientX
      let endY = e.changedTouches[0].clientY
      if(endTime - this.startTime > 2000){
        return
      }
      let direction
      if(Math.abs(endX - this.startX) < 20 || Math.abs(endY - this.startY) > 20 ){
        return
      } else {
        direction = endX > this.startX ? "right" : "left"
      }
      this.$emit("swiperAction", {direction})
    }
  }
}
</script>
