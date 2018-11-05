import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { filters, getMinMaxOf, setToLocalCollection } from "./modules/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hotels: [],
    showFilters: false,
    user: null,
    hotelRequestError: false,
    hotelRequestloading: true,
    filters: {
      distance_to_venue: null,
      rating: null,
      price_category: "",
      amenities: [],
      hotelName: ""
    }
  },
  getters: {
    filterdHotels: state => {
      return state.hotels.filter(hotel => {
        let { distance, rating, priceCategory, amenities, name } = filters;

        return (
          distance(hotel.distance_to_venue, state.filters.distance_to_venue) &&
          rating(hotel.rating, state.filters.rating) &&
          priceCategory(hotel.price_category, state.filters.price_category) &&
          amenities(hotel.amenities, state.filters.amenities) &&
          name(hotel.name, state.filters.hotelName)
        );
      });
    },

    distanceRange: state => getMinMaxOf(state.hotels, "distance_to_venue")
  },
  mutations: {
    setHotels(state, res) {
      state.hotels.push(...res.data);
    },
    setFilter(state, { name, value }) {
      state.filters[name] = value;
    },
    setState(state, { name, value }) {
      state[name] = value;
    },
    removeHotel(state, i) {
      state.hotels.splice(i, 1);
    },
    addHotel(state, newHotel) {
      state.hotels.unshift(newHotel);
    }
  },
  actions: {
    getHotels: context => {
      if (context.state.hotels.length === 0)
        axios
          .get("hotels")
          .then(res => {
            context.commit("setHotels", res);
            context.commit("setState", { name: "showFilters", value: true });
            context.commit("setState", {
              name: "hotelRequestloading",
              value: false
            });
          })
          .catch(() =>
            context.commit("setState", {
              name: "hotelRequestError",
              value: true
            })
          );
    },
    logUserin(context, user) {
      if (!user.firstName || !user.lastName) return;
      setToLocalCollection({
        collection: "user",
        payload: user
      });
      context.commit("setState", { name: "user", value: user });
    },
    logUserout(context) {
      if (!context.state.user) return;
      localStorage.removeItem("user");
      context.commit("setState", { name: "user", value: null });
    }
  }
});
