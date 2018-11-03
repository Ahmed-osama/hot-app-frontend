
<template>
  <div>
  
    <p> Should provide an intuitive way to present more information about a hotel once some form of interaction takes place</p>
   
    <div class="container">
      <hotels-filter v-if="showFilters" class="container__filter" />
      <div class="container__hotels">
        <div v-for="hotel in filterdHotels" :key="hotel.id">
          <router-link :to="`/hotel-detail/${hotel.id}`"><img :src="hotel.images[0]" :alt="hotel.name"></router-link>
          <h1>
            <router-link :to="`/hotel-detail/${hotel.id}`">
              {{hotel.name}}</router-link>
          </h1>
          <h2>distance to venue : {{hotel.distance_to_venue}}</h2>
          <p v-if="hotel.rating">rating : <strong>{{hotel.rating.toFixed(1)}}</strong></p>
          <p>price category : <strong>{{hotel.price_category}}</strong></p>
          <h4>amenities :
            <ul>
              <li v-for="aminity of hotel.amenities" :key="aminity">{{aminity}}</li>
            </ul>
          </h4>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState, mapGetters, mapActions } from "vuex";
import Filters from "@/components/Filters.vue";

export default {
  name: "home",
  components: {
    "hotels-filter": Filters
  },
  computed: {
    ...mapGetters(["filterdHotels"]),
    ...mapState(["showFilters"])
  },
  methods: {
    ...mapActions(["getHotels"])
  },
  mounted() {
    this.getHotels();
  }
};
</script>

<style lang="sass">
  .container
    display: flex
    &__filter
      flex-basis: 20%
    &__hotels
      flex-basis: 80%
</style>

