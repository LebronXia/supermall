<!-- 首页 -->
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" />

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore" @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImageLoad=swiperImageLoad></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />

      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!--ul>li{列表}*100-->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"

import { getHomeMultidata, getHomeGoods } from "network/home"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import { itemListenerMixin } from "common/mixin"

export default {
  data() {
    return {
      currentType: 'pop',
      result: null,
      banners: [],
      recommends: [],
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      }
    };
  },
  mixins: [itemListenerMixin],

  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },


  //活跃
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()

  },

  //不活跃
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },

  //销毁
  destroyed() {
    console.log("销毁")
  },

  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {

    showGoods() {
      return this.goods[this.currentType].list
    }
  },

  methods: {

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      console.log("滑到底部了")
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log('tabOffsetTop:' + this.tabOffsetTop)
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(res);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log("aaaa", res)
        this.goods[type].page += 1
        this.goods[type].list.push(...res.data.list)


        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}

</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  /* viewheight 100%的高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: sticky;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>