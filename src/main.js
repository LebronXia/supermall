import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

//实现全局变量   vue原型链挂载总线
Vue.prototype.bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
