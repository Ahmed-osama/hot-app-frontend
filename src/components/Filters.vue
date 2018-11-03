
<template>
  <aside class="listCard">
    <section class="listCard__item">

      <input type="text" v-model="hotelName" placeholder="find hotel by its name">
    </section>
   <section class="listCard__item">
     <strong class="listCard__head">filter by amenities</strong>
     <ul>
      <li v-for="ameniti of amenities" :key="ameniti" class="input-checkbox_-row">
     
        <span class="input-checkbox">
          <input  class="input-checkbox__input"  type="checkbox" :id="'amenities'+ameniti" :value="ameniti" v-model="selectedAmenities">
          <span class="input-checkbox__preview"></span>
        </span>
        <label class="input-checkbox_-_label" :for="'amenities'+ameniti">{{ameniti}}</label>
      </li>
    </ul>
  </section>
   
   <section class="listCard__item">
     <strong class="listCard__head">price_category</strong>
    <ul>
      <li v-for="category of price_category" :key="category" class="input-checkbox_-row">
        <span class="input-checkbox input-checkbox--radio">
          <input type="radio" class="input-checkbox__input" name="price_category" :id="'price_'+category" :value="category" v-model="selectedPrice_category" >
          <span class="input-checkbox__preview"></span>
        </span>
        <label class="input-checkbox_-_label" :for="'price_'+category">{{category || 'all'}}</label>
      </li>
    </ul>
  </section>
   
   
  <section class="listCard__item ">
    <strong class="listCard__head">Rating</strong>
    <div class="form-row">

      <input type="range" step="1" min="0" max="5" v-model="rating">
      <span class="btn btn--xs btn--square btn--right  btn--mleft btn--mw50 blue_bg">{{rating}}</span>
    </div>
  </section>
    <section class="listCard__item" v-if="distanceRange.min">
      <strong class="listCard__head">distance</strong>
       <div class="form-row">
      <input  id="range" type="range" :step="dsitanceStepper"  :min="distanceRange.min" :max="distanceRange.max" v-model.lazy="distance">
       <span class="btn btn--xs btn--square btn--right btn--mleft btn--mw50 blue_bg">{{distance}}</span>
      </div>
    </section>

  </aside>
</template>

<script>
import { amenities, price_category } from "../modules/constants";
import { mapMutations, mapState, mapGetters } from "vuex";
import loading from "../assets/img/loading.gif";

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
<style lang="scss">
.listCard {
  background: white;
  border-radius: 3px;
  box-shadow: 0px 2px 6px -1.1px rgba(0, 0, 0, 0.11);
  margin-bottom: 30px;
  &__head {
    margin-bottom: 15px;
    display: flex;
  }
  &__item {
    padding: 20px;
    & + & {
      border-top: 1px solid #f2f2f2;
    }
  }
}
</style>

