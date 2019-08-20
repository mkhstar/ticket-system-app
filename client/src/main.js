import Vue from "vue";
import App from "./App.vue";
import routes from "./routers/routers";
import VueRouter from "vue-router";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(Toasted);
Vue.use(VueRouter);

export const router = new VueRouter({
  base: "/",
  // mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router,
  components: {
    App
  }
}).$mount("#app");
