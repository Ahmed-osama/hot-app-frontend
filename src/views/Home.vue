
<template>
  <div>
    <p> Should present all recommended hotels in a convenient way showing only information you find to be important on initial load</p>
    <p> Should provide an intuitive way to present more information about a hotel once some form of interaction takes place</p>
    <p> A visitor may be able to apply certain filters to restrict the list of hotels according to his likings in terms of distance_to_venue, rating, price_category and individual amenities</p>
    <p> A visitor needs to be able to conveniently navigate to the "Hotel detail page"</p>
    <p v-for="hotel in hotels" :key="hotel.id">
      <router-link :to="`/hotel-detail/${hotel.id}`">{{hotel.name}}</router-link>

    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      hotels: []
    };
  },
  mounted() {
    axios.get("http://localhost:3000/hotels").then(res => {
      this.hotels.push(...res.data);
    });
  }
};
</script>
