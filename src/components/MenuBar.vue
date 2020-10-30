<template>
  <div class="menu-bar-wrap">
    <transition name="slide-up">
      <div
        class="ebook-bottom"
        v-show="isShow"
        :class="{ 'hide-shadow': isSettingShow || !isShow }"
      >
        <div class="icon-wrap" @click="settingShow(3)">
          <span class="icon-menu"></span>
        </div>
        <div class="icon-wrap" @click="settingShow(2)">
          <span class="icon-progress"></span>
        </div>
        <div class="icon-wrap" @click="settingShow(1)">
          <span class="icon-bright"></span>
        </div>
        <div class="icon-wrap" @click="settingShow(0)">
          <span class="icon">A</span>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div class="menu-setting-wrap" v-show="isSettingShow">
        <div class="menu-font-size" v-if="tag == 0">
          <div
            class="preview"
            :style="{ 'font-size': fontSizeList[0].fontSize + 'px' }"
          >
            A
          </div>
          <div class="select">
            <div
              class="select-wrap"
              :class="{'hide-border': index == fontSizeList.length - 1}"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="changeFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrap">
                <div class="point" v-show="defaultFontSize == item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
            <div
              class="preview"
              :style="{
                'font-size':
                  fontSizeList[fontSizeList.length - 1].fontSize + 'px'
              }"
            >
              A
            </div>
          </div>
        </div>

        <div class="menu-theme-wrap" v-else-if="tag == 1">
          <div class="menu-theme" v-for="(item, index) in themeList" :key="index" @click="changeTheme(index)">
            <div class="preview" :style="{background: item.style.body.background}" :class="{'hide-border': item.style.body.background != '#fff'}"></div>
            <div class="theme-text" :class="{selected: defaultTheme == index}">{{item.name}}</div>
          </div>
        </div>

        <div class="menu-progress-wrap" v-else-if="tag == 2">
          <el-slider
            v-model="progress"
            :step="1"
            :disabled="!bookAvailable"
            @change="onProgressChange"
          >
          </el-slider>
          <div style="font-size: 20px;">
            <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 目录 -->
    <div class="menu-catalog-wrap" v-if="tag == 3">
      <el-drawer
        :visible.sync = "drawer"
        direction = "ltr"
        :modal-append-to-body = "false"
        :show-close = "false"
        size="50%"
        class="drawer-wrap"
      >
      <div v-for="(item, index) in navigation.toc" :key="index" class="drawer-text" @click="jumpTo(item)">
        <div>{{item.label}}</div>
        <template v-if="item.subitems.length">
          <!-- @click.stop阻止事件冒泡 -->
          <div class="drawer-inner" v-for="innerItem in item.subitems" :key="innerItem.id" @click.stop="jumpTo(innerItem)">{{innerItem.label}}</div>
        </template>
      </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSettingShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 16 },
        { fontSize: 20 },
        { fontSize: 24 },
        { fontSize: 26 },
        { fontSize: 30 },
        { fontSize: 36 }
      ],
      tag: 0,
      progress: this.parentProgress,
      drawer: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    themeList: Array,
    defaultTheme: Number,
    defaultFontSize: Number,
    navigation: Object,
    bookAvailable: Boolean,
    parentProgress: Number
  },
  methods: {
    jumpTo(item) {
      console.log(item)
      this.$emit('jumpTo', item.href)
      this.drawer = false
    },
    settingShow(tag) {
      this.isSettingShow = +tag !== 3
      this.tag = tag
      this.drawer = +tag === 3
    },
    hideSetting() {
      this.isSettingShow = false
    },
    // 改变字号
    changeFontSize(fontSize) {
      this.$emit('changeFontSize', fontSize)
    },
    // 改变主题
    changeTheme(index) {
      this.$emit('changeTheme', index)
    },
    // 改变进度
    onProgressChange() {
      this.$emit('progressChange', this.progress)
    }
  },
  watch: {
    parentProgress: {
      handler: function(val) {
        this.progress = val
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/global.scss";
.menu-bar-wrap {
  .ebook-bottom {
    width: 100%;
    height: px2rem(50);
    position: absolute;
    z-index: 101;
    left: 0;
    bottom: 0;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.1);
    display: flex;
    background: white;
    &.hide-shadow {
      box-shadow: none;
    }
    .icon-wrap {
      flex: 1;
      font-size: px2rem(24);
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(26);
      }
    }
  }

  .menu-setting-wrap {
    width: 100%;
    height: px2rem(60);
    position: absolute;
    bottom: px2rem(50);
    left: 0;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.1);
    background: white;
    .menu-font-size {
      width: 100%;
      height: 100%;
      display: flex;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrap:last-child{
          background: red;
        }
        .select-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child{
            .line{
              &:first-child{
                border-top: none;
              }
            }
          }
          &.hide-border{
            .line{
              &:last-child{
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrap {
            flex: 0 0 0;
            height: px2rem(8);
            border-left: px2rem(1) solid #ccc;
            position: relative;
            .point{
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: px2rem(-10);
              margin-top: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              background: white;
              border: px2rem(1) solid #ccc;
              border-radius: 50%;;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.1);
              @include center;
              .small-point{
                width: px2rem(6);
                height: px2rem(6);
                background: #000;
                border-radius: 50%;
                border: px2rem(1) solid #ccc;
              }
            }
          }
        }
      }
    }

    .menu-theme-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      .menu-theme{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .preview{
          height: px2rem(20);
          margin: 0 px2rem(15);
          box-sizing: border-box;
          border: px2rem(1) solid #ccc;
          border-radius: px2rem(5);
          &.hide-border{
            border: none;
          }
        }
        .theme-text{
          font-size: px2rem(20);
          margin-top: px2rem(5);
          color: #999;
          &.selected{
            color: #333;
          }
        }
      }
    }
  }
  .menu-catalog-wrap{
    .drawer-wrap{
      .drawer-text{
        font-size: 20px;
        line-height: 1.5;
        text-align: left;
        padding: 10px 50px;
        cursor: pointer;
        .drawer-inner{
          cursor: pointer;
          font-size: 18px;
          margin: 10px 0 10px 20px;
        }
      }
    }
    /deep/ .el-drawer.ltr, .el-drawer.rtl, .el-drawer__container{
      overflow: auot;
    }
  }
  .menu-progress-wrap{
    width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    box-sizing: border-box;
    margin-top: 20px;
    /deep/ .el-slider__button-wrapper{
      top: -35px;
    }
  }
}
</style>
