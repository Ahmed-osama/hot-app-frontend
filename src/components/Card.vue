<template>
  <div class="post-view post-view--card post-view--cardBounded ">
    <router-link :to="`/hotel-detail/${hotel.id}`" class="post-view__link" :title="hotel.name"></router-link>
    <div class="post-view__img">
      <span class="post-view__padge" :class="classes(hotel.price_category)">{{hotel.price_category}} price</span>
      <span class="post-view__icon">
            <svg class="u-icon post-view__icon-inner">
              <use xlink:href="assets/img/icons.svg#icon-play"></use>
            </svg>
          </span>
      <img v-bind:src="require(`../assets/img/hotels/${hotel.images[0]}.jpg`) " :alt="hotel.name">
    </div>
    <div class="post-view__caption" :alt="hotel.name">
      <h4 class="post-view__maxTitle">{{hotel.name}}
      </h4>
      <ul class="post-view__ul">
  
        <li class="post-view__li">
           <span class="btn btn--sm liteGry_bg btn--noshadow btn--fwb">{{hotel.rating.toFixed(1)}}</span>
          <star-rating read-only :rating="parseInt(hotel.rating.toFixed(1))" :star-size="16" :show-rating="false" /></li>
          <li class="post-view__li dark_color">
            <span class="btn btn--sm liteGry_bg btn--noshadow u-mr-10 btn--fwb">{{hotel.distance_to_venue}}</span>
            <span class="darkGry_color">meters to venue</span>
          </li>
          <li class="post-view__li post-view__li--hidden">
            <span class="btn btn--sm liteGry_border" v-for="amn in hotel.amenities" :key="amn">{{amn}}</span>
          </li>
  
       
      </ul>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
export default {
  name: "hotel-card",
  components: {
    "star-rating": StarRating
  },
  props: {
    hotel: {
      type: Object
    }
  },
  methods: {
    classes(val) {
      return {
        red_bg: val === "high",
        yellow_bg: val === "medium",
        green_bg: val === "low"
      };
    }
  },
  computed: {
    totalcost: function(params) {
      return Math.round(this.hotel.price * 2);
    }
  }
};
/* eslint-disable */
</script>
