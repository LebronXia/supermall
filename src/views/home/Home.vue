<!-- 首页 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata } from "network/home"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"

export default {
  data() {
    return {
      result: null,
      banners: [],
      recommends: []
    };
  },

  created() {
    getHomeMultidata().then(res => {
      this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(res);
    });
  },

  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },

  computed: {},

  methods: {}
}

</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>