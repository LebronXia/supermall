<!-- 详情基本信息 -->
<template>
  <div clas="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span
        class="info-serice-item"
        v-for="index in goods.services.length-1"
        :key="index"
      >
        <img :src="goods.services[index -1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: Object,
  },
  data() {
    return {
    };
  },

  components: {},

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted(){},

  methods: {}
}

</script>
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  background-color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-price {
  margin-top: 12px;
}

.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.info-price .o-price {
  margin-left: 5px;
  font-size: 14px;
  text-decoration: line-through;
}
.info-price .discount {
  margin-left: 5px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;

  position: relative;
  top: -8px;
}

.info-other {
  font-size: 13px;
  margin-top: 15px;
  display: flex;
  border-bottom: 1px solid rgba(100, 100, 100, 1);
  justify-content: space-between;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-serice-item img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
}

.info-serice-item span {
  font-size: 12px;
  color: #333;
}
</style>