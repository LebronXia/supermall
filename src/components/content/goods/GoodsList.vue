<!--  -->
<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    >

    </goods-list-item>

  </div>
</template>

<script>

import GoodsListItem from './GoodsListItem'

export default {

  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    };
  },

  components: {
    GoodsListItem
  },

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted: {},

  methods: {}
}

</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>