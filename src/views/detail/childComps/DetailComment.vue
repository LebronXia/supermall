<!--  -->
<template>
  <div class="detail-comment">
    <div class="comment-title">
      <div class="comment-name">用户评价</div>
      <div class="comment-more">更多
        <!-- <i class="arrow-right"></i> -->
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <P>{{commentInfo.content}}</P>
      <div class="info-other">
        <span class="date">{{commentInfo.created}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div>
        <img
          v-for="(item, index) in commentInfo.images"
          :src="item"
          :key="index"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    commentInfo: {
      type: Object,
      deauft() {
        return {}
      }
    }
  },
  data() {
    return {
    };
  },

  components: {},

  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted: {},

  methods: {}
}

</script>
<style scoped>
.detail-comment {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.comment-title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
.comment-name {
  float: left;
  font-size: 15px;
}
.comment-more {
  float: right;
  margin-right: 10px;
  font-size: 15px;
}

.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
  padding: 0 4px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999999;
  margin-top: 10px;
}
</style>