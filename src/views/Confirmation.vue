
<template>
  <div class="home">
    <div v-if="confirmation">
      <h1>welcome {{confirmation.guest}}</h1>
      <h2>confirmation for {{confirmation.room.name}} @ {{confirmation.hotel.name}}</h2>
      <p>your confirmation id : {{confirmation.id}}</p>
      <p>Hotel rating : {{confirmation.hotel.rating}}</p>
      <p>Hotel aminites : <span v-for="aminity in confirmation.hotel.amenities" :key="aminity">{{aminity}}, </span></p>
      <hr>
      <h2>{{confirmation.room.price_in_usd+"$"}} total for 2 nights and {{confirmation.room.max_occupancy}} Persons</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      confirmation: null
    };
  },
  methods: {
    loadConfirmation() {
      let confirmations = JSON.parse(localStorage.getItem("confirmations"));
      if (confirmations[this.$route.params.confirmationId]) {
        this.confirmation = confirmations[this.$route.params.confirmationId];
      } else {
        axios
          .get(
            `http://localhost:3000/confirmations/${
              this.$route.params.confirmationId
            }`
          )
          .then(res => {
            this.confirmation = res.data;
          }).cat;
      }
    }
  },
  mounted() {
    this.loadConfirmation();
  }
};
</script>
