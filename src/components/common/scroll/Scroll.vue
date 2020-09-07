<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },

  components: {},

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      scrollY: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        //console.log(position)
        this.$emit('scroll', position)
      })
    }

    //监听Scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        console.log("底部~~~~")
        this.$emit('pullingUp')
      })
    }

  },

  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    refresh() {
      this.scroll && this.scroll.refresh()
    },

    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}

</script>
<style scoped>
</style>