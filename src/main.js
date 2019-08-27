import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
// 导入极验
require('@/assets/gt.js');
// 绑定到原型
Vue.prototype.$initGeet=initGeetest;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
