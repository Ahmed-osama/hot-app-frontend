
<template>
  <div class="home">
    <div v-if="hotel">
      <h1>{{hotel.name}}</h1>
      <p>{{hotel.description}}</p>
      <strong>/{{hotel.price_category}}</strong>
      <p>distance to venue : {{hotel.distance_to_venue}}</p>
      <ul>
        <li v-for="aminity in hotel.amenities" :key="aminity">{{aminity}}</li>
      </ul>
      <img v-for="img of hotel.images" :key="img" src="https://via.placeholder.com/150

C/O https://placeholder.com/" :alt="hotel.name" />

      <div v-if="rooms.length > 0">
          <ul>
            <li v-for="room of visibleRooms" :key="room.id">
              <h3>{{room.name}} for {{room.price_in_usd}}$</h3>
              <p>{{room.description}}</p>
              <strong>total for {{room.max_occupancy}} Persons</strong><br>
              <button @click="bookRoom(room)">book now</button>
              <hr>
            </li>
          </ul>
          <button v-if="maxVisibleRooms!=rooms.length" @click="showAllRooms" > show all rooms</button>
      </div>
      <hr>


    </div>
  </div>
</template>

<script>
import confirmationFormatter from "../modules/confirmationFormatter";
import { setToLocalCollection } from "../modules/utils";
import { mapActions, mapGetters, mapState } from "vuex";
import { Axios } from "@/modules/axios";

export default {
  name: "hotel-details",
  data() {
    return {
      hotel: null,
      rooms: [],
      maxVisibleRooms: 2,
      showLogin: false,

      cacheConfirmation: null
    };
  },

  methods: {
    loadRooms() {
      return Axios.get(`rooms/?hotelId=${this.$route.params.hotelId}`);
    },
    loadHotel() {
      return Axios.get(`hotels/${this.$route.params.hotelId}`);
    },
    bookRoom(room) {
      let confirmation = confirmationFormatter(this.hotel, room);
      this.cachedConfirmation = confirmation;

      if (!this.user) {
        this.showlogin();
        return;
      }
      confirmation.guest = `${this.user.firstName} ${this.user.lastName}`;
      Axios.post(`confirmations/`, confirmation).then(() => {
        setToLocalCollection({
          collection: "confirmations",
          key: confirmation.id,
          payload: confirmation
        });

        this.$router.push({
          name: "confirmation",
          params: {
            confirmationId: confirmation.id
          }
        });
      });
    },
    showlogin() {
      this.showLogin = true;
    },
    loginAndBook() {
      this.logUserin(this.user);
      if (this.cachedConfirmation) this.bookRoom(this.cachedConfirmation);
    },
    showAllRooms() {
      this.maxVisibleRooms = this.rooms.length;
    },
    ...mapActions(["logUserin"])
  },
  computed: {
    ...mapState(["user"]),
    visibleRooms() {
      let visibleRooms = [...this.rooms].sort(
        (a, b) => a.price_in_usd - b.price_in_usd
      );
      visibleRooms.length = this.maxVisibleRooms;
      return visibleRooms;
    }
  },
  mounted() {
    let self = this;
    Axios.all([this.loadHotel(), this.loadRooms()]).then(
      Axios.spread(function(hotel, rooms) {
        self.hotel = hotel.data;
        self.rooms.push(...rooms.data);
      })
    );
  }
};
</script>
