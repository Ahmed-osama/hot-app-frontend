import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { filters, getMinMaxOf } from "./modules/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hotels: [],
    showFilters: false,
    filters: {
      distance_to_venue: null,
      rating: null,
      price_category: "",
      amenities: []
    }
  },
  getters: {
    filterdHotels: state => {
      return state.hotels.filter(hotel => {
        let { distance, rating, priceCategory, amenities } = filters;

        return (
          distance(hotel.distance_to_venue, state.filters.distance_to_venue) &&
          rating(hotel.rating, state.filters.rating) &&
          priceCategory(hotel.price_category, state.filters.price_category) &&
          amenities(hotel.amenities, state.filters.amenities)
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
    }
  },
  actions: {
    getHotels: context => {
      if (context.state.hotels.length === 0)
        axios.get("http://localhost:3000/hotels").then(res => {
          context.commit("setHotels", res);
          context.commit("setState", { name: "showFilters", value: true });
        });
    }
  }
});
