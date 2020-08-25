<!--  -->
<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
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
      mouseWheel: true
    })

  },

  methods: {}
}

</script>
<style scoped>
</style>