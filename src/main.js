import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import service from "./utils/http";
import "./utils/filters.js";
import "./utils/directives.js";
import api from "./api";
import eruda from "eruda";
// MINT-UI组件库
import Mint from "mint-ui";
import { Dialog } from "vant";
import "mint-ui/lib/style.css";
Vue.config.productionTip = false;
Vue.use(Mint);
Vue.prototype.$service = service;
Vue.prototype.api = api;
Vue.use(Dialog);
// if (window.location.host.indexOf("api") == -1) {
// 	eruda.init();
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
