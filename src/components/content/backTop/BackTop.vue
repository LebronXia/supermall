<!--  -->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() { },

  methods: {}
}

</script>
<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>