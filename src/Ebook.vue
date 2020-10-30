<template>
  <div class="main">
    <title-bar :isShow="isShow"></title-bar>
    <div class="ebook-wrap">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      :isShow = "isShow"
      ref = "menu"
      :defaultFontSize = "defaultFontSize"
      :themeList = "themeList"
      :defaultTheme = "defaultTheme"
      @changeFontSize = "changeFontSize"
      @changeTheme = "changeTheme"
      :navigation = "navigation"
      @jumpTo = "jumpTo"
      :bookAvailable = "bookAvailable"
      :parentProgress = "progress"
      @progressChange = "progressChange"
    >
    </menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'
export default {
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      isShow: false,
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000', 'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      navigation: null,
      bookAvailable: false,
      progress: 0
    }
  },
  methods: {
    // 改变进度 progress 进度条的数值（0-100）
    progressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    changeProgress() {
      // 获取当前的位置信息
      const currentLocation = this.rendition.currentLocation()
      // 获取当前的位置的进度百分比
      this.progress = this.locations.percentageFromCfi(currentLocation.start.cfi)
      // console.log(this.progress)
      // 转换为 0-100 的数字
      this.progress = Math.round(this.progress * 100)
    },
    // 根据目录链接跳转到指定位置
    jumpTo(href) {
      // 通过Rendtion.display渲染电子书
      this.rendition.display(href).then(() => {
        this.changeProgress()
      })
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu() {
      this.isShow = false
      this.$refs.menu.hideSetting()
    },
    // 改变字号
    changeFontSize(fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    // 注册主题
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    // 改变主题
    changeTheme(index) {
      this.defaultTheme = index
      const name = this.themeList[index].name
      this.themes.select(name)
    },
    toggleTitleAndMenu() {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.$refs.menu.hideSetting()
      }
    },
    // 上一页
    prevPage() {
      // Rendition.prev()
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.changeProgress()
        })
      }
    },
    // 下一页
    nextPage() {
      // Rendition.next()
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.changeProgress()
        })
      }
    },
    showEbook() {
      // 生成book对象
      let book = new Epub(
        '/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
      )
      // 通过Book.renderTo生成Rendition对象, 参数: dom id
      this.rendition = book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通过Rendtion.display渲染电子书
      this.rendition.display()
      // 获取Theme对象
      this.themes = this.rendition.themes
      // 设置默认字体
      this.changeFontSize(this.defaultFontSize)
      // 注册主题
      this.registerTheme()
      // 设置默认主题
      this.changeTheme(this.defaultTheme)

      book.ready.then(() => {
        this.navigation = book.navigation
        console.log(this.navigation)
        // 执行分页
        return book.locations.generate()
      }).then((result) => {
        // 获取location对象
        this.locations = book.locations
        // 标记电子书为解析完毕状态
        this.bookAvailable = true
      })
    }
  },
  mounted() {
    this.showEbook()
  }
}
</script>

<style lang='scss'>
@import './assets/styles/global.scss';
.main {
  position: relative;
  height: 100%;
  .ebook-wrap {
    .mask {
      width: 100%;
      // height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
        &:hover{
          cursor: pointer;
        }
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
