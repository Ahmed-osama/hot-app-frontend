
<template>
  <div class="home">
  
    <p>Should present all necessary hotel and room information from the item
       you previously selected. In addition a unique booking number and your
        account's first- and lastname should be provided</p>

    <p>Make sure that the latest booking is always available to see on this 
      page and the url can be bookmarked. Even if the API is not available you
       should be able to see all the available data without the need to perform
        any requests</p>

        <div v-if="confirmation">
          <h1>confirmation for {{confirmation.room.name}} @ {{confirmation.hotel.name}}</h1>
          <p>your confirmation id : {{confirmation.id}}</p>
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
      let confirmations = JSON.parse(localStorage.getItem("confirmation"));
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
            console.log(res);
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
