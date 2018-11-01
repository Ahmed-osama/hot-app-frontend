import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import HotelDetials from "./views/Hotel-details.vue";
import Confirmation from "./views/Confirmation.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/hotel-detail/:hotelId",
      name: "hotel-detail",
      component: HotelDetials
    },
    {
      path: "/confirmation/:confirmationId",
      name: "confirmation",
      component: Confirmation
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ]
});
