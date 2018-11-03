
<template>
  <div>
  
    <p> Should provide an intuitive way to present more information about a hotel once some form of interaction takes place</p>
  
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <hotels-filter v-if="showFilters" class="container__filter" />
        </div>
        <div class="col-md-9">
          <div class="row">
  
            <div class="col-md-4" v-for="hotel in filterdHotels" :key="hotel.id">
  
              <hotel-card :hotel="hotel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState, mapGetters, mapActions } from "vuex";

import Filters from "@/components/Filters.vue";
import Card from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    "hotels-filter": Filters,
    "hotel-card": Card
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
  
</style>

