
<template>
  <div class="hello">
    <h4>Name</h4>
    <input type="text" v-model="hotelName">
    <hr>
    <h4>amenities</h4>
    <ul>
      <li v-for="ameniti of amenities" :key="ameniti">
        <input type="checkbox" :id="'amenities'+ameniti" :value="ameniti" v-model="selectedAmenities" >
        <label :for="'amenities'+ameniti">{{ameniti}}</label>
      </li>
    </ul>
    <hr>
    <h4>price_category</h4>
    <ul>
      <li v-for="category of price_category" :key="category">
        <input type="radio"  name="price_category" :id="'price_'+category" :value="category" v-model="selectedPrice_category" >
        <label :for="'price_'+category">{{category || 'all'}}</label>
      </li>
    </ul>
    <hr>
    <h4>Rating</h4>
    <input type="range" step="1" min="0" max="5" v-model="rating">
    
    <hr>
    <div v-if="distanceRange.min">

      <h4>distance</h4>
      <label for="range">{{distance}} </label>
      <input  id="range" type="range" :step="dsitanceStepper"  :min="distanceRange.min" :max="distanceRange.max" v-model.lazy="distance">
    </div>

  </div>
</template>

<script>
import { amenities, price_category } from "../modules/constants";
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "filters",
  data() {
    return {
      amenities,
      price_category: [...price_category, ""],
      selectedAmenities: [],
      selectedPrice_category: "",
      rating: 0,
      distance: undefined,
      hotelName: ""
    };
  },
  methods: {
    ...mapMutations(["setFilter"])
  },
  computed: {
    ...mapGetters(["distanceRange"]),
    dsitanceStepper: function() {
      return Math.round((this.distanceRange.max - this.distanceRange.min) / 10);
    }
  },
  watch: {
    selectedAmenities: function() {
      this.setFilter({
        name: "amenities",
        value: this.selectedAmenities
      });
    },
    selectedPrice_category: function() {
      this.setFilter({
        name: "price_category",
        value: this.selectedPrice_category
      });
    },
    rating: function() {
      this.setFilter({
        name: "rating",
        value: parseInt(this.rating)
      });
    },
    distance: function() {
      this.setFilter({
        name: "distance_to_venue",
        value: parseInt(this.distance)
      });
    },
    hotelName: function() {
      this.setFilter({
        name: "hotelName",
        value: this.hotelName
      });
    }
  },
  mounted() {
    this.distance = this.distanceRange.max;
    this.rating = 0;
  }
};
</script>
