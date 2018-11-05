
<template>
  <div class="row">
    <div class="col-md-3">
      <hotels-filter v-if="showFilters" class="container__filter" />
      <div v-if="!showFilters" class="placeholder placeholder--card-filter"></div>
    </div>
    <div class="col-md-9">
  
      <transition-group class="row" name="fade">
        <div class="col-xs-12" key="eror" v-if="hotelRequestError">
          <div class="msg msg--error" >
            <p> couldn't load hotels plz make sure you connection is working</p>
          </div>
        </div>
  
        <placeholder key="loading" :count="9" v-if="hotelRequestloading" class="col-md-12" />
        <div class="col-md-4" v-for="hotel in filterdHotels" :key="hotel.id" v-if="!hotelRequestloading">
          <hotel-card :hotel="hotel" />
        </div>
  
      </transition-group>
  
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState, mapGetters, mapActions } from "vuex";

import Filters from "@/components/Filters.vue";
import Card from "@/components/Card.vue";
import placeholder from "@/components/Card.placeholder.vue";

export default {
  name: "home",
  data() {
    return {
      loading: true
    };
  },
  components: {
    "hotels-filter": Filters,
    "hotel-card": Card,
    placeholder
  },
  computed: {
    ...mapGetters(["filterdHotels"]),
    ...mapState(["showFilters", "hotelRequestloading", "hotelRequestError"])
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
  
</style>

