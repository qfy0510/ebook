<template>
  <div class="title-bar-wrap">
    <transition name="slide-down">
      <div class="ebook-top" v-show="isShow">
        <div class="left">
          <div class="icon-wrap">
            <span class="icon-back"></span>
          </div>
        </div>
        <div class="right">
          <div class="icon-wrap">
            <span class="icon-cart"></span>
          </div>
          <div class="icon-wrap">
            <span class="icon-person"></span>
          </div>
          <div class="icon-wrap">
            <span class="icon-more"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/global.scss';
.title-bar-wrap{
 .ebook-top{
    width: 100%;
    height: px2rem(50);
    position: absolute;
    z-index: 101;
    left: 0;
    top: 0;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,0.1);
    display: flex;
    background: white;
    @include center;
    .left{
      flex: 0 0 px2rem(60);
      .icon-wrap{
        font-size: px2rem(22);
      }
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrap{
        flex: 0 0 px2rem(60);
        font-size: px2rem(24);
        @include center;
      }
    }
  }
}
</style>
