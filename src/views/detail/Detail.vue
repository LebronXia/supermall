<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="detail_wrapper" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" ref="goodsInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment :comment-info="comment" ref="recommend"></detail-comment>
      <goods-list :goods='recommends' ref="recommend"></goods-list>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailComment from "./childComps/DetailComment"

import Scroll from "components/common/scroll/Scroll"
import GoodsList from 'components/content/goods/GoodsList'

import { itemListenerMixin } from "common/mixin"

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      comment: {},
      recommends: [],
      themeTopYs: []
    };

  },
  mixins: [itemListenerMixin],
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo);

      //保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论
      if (data.rate.cRate !== 0) {
        this.comment = data.rate.list[0];
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      //console.log(res.data.list)
    });
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    Scroll
  },

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() { },

  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },

    //图片全部加载完成，计算滚动区域
    imgLoad() {
      this.$refs.scroll.refresh()

      console.log('图片加载完毕')
      //设置对应的定位位置
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // this.themeTopYs.push(Number.MAX_VALUE)

    }
  }
}

</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail_wrapper {
  height: calc(100% - 44px);
}
</style>