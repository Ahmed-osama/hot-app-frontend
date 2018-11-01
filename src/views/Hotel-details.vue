
<template>
  <div class="home">
    <div v-if="hotel">
      <h1>{{hotel.name}}</h1>
      <p>{{hotel.description}}</p>
      <strong>/{{hotel.price_category}}</strong>
      <p>distance to venue : {{hotel.distance_to_venue}}</p>
      <ul>
        <li v-for="aminity in hotel.aminites" :key="aminity">{{aminity}}</li>
      </ul>
      <img v-for="img of hotel.images" :key="img" src="https://via.placeholder.com/150

C/O https://placeholder.com/" :alt="hotel.name" />

      <div v-if="rooms.length > 0">
          <ul>
            <li v-for="room of rooms" :key="room.id">
              <h3>{{room.name}} / {{room.price_in_usd}}</h3>
              <p>{{room.description}}</p>
              <strong>{{room.max_occupancy}} Persons</strong>
              <button @click="bookRoom(room)">book now</button>
            </li>
          </ul>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import uuid from "uuid/v1";
export default {
  name: "hotel-details",
  data() {
    return {
      hotel: null,
      rooms: []
    };
  },
  methods: {
    loadRooms() {
      axios
        .get(
          `http://localhost:3000/rooms/?hotelId=${this.$route.params.hotelId}`
        )
        .then(res => {
          this.rooms.push(...res.data);
        });
    },
    bookRoom(room) {
      let confirmation = {
        id: uuid(),
        hotelId: this.hotel.id,
        roomId: room.id,
        hotel: this.hotel,
        room
      };

      axios
        .post(`http://localhost:3000/confirmations/`, confirmation)
        .then(() => {
          this.$router.push({
            name: "confirmation",
            params: {
              confirmationId: confirmation.id
            }
          });
          let confirmationHistory =
            JSON.parse(localStorage.getItem("confirmation")) || {};
          confirmationHistory[confirmation.id] = confirmation;
          localStorage.setItem(
            "confirmation",
            JSON.stringify(confirmationHistory)
          );
        });
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/hotels/${this.$route.params.hotelId}`)
      .then(res => {
        this.hotel = res.data;
      })
      .then(() => this.loadRooms());
  }
};
</script>
