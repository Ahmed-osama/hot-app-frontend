
<template>
  <div v-if="hotel">
    <carousel mouseDrag  :per-page="1" paginationColor="#fff" loop  paginationActiveColor="#feea3a">
    <slide :key="img"  v-for="img of hotel.images">
     <img   :src="require(`../assets/img/hotels/${img}.jpg`) " :alt="hotel.name" />
    </slide>
     
  </carousel>

    
    <section class="section section--wh section--mb section--fp">
  
      <h1 class="section__mainTitle">{{hotel.name}}</h1>
      <p class="u-row">
        <strong>price average : </strong>
        <span class="btn btn--sm" :class="labels(hotel.price_category)">{{hotel.price_category}}</span>
      </p>
      <p class="u-row">
        <span>distance to venue : </span>
        <strong> {{hotel.distance_to_venue}}</strong>
      </p>
      <p class="u-row u-wrap">
        <strong>aminites</strong>
        <span class="btn btn--sm u-mb-10 liteGry_border" v-for="amn in hotel.amenities" :key="amn">
          <img class="u-icon post-view__liIcon" :src="require(`../assets/img/icons/${amn}.svg`)"/>
          {{amn}}
        </span>
      </p>
      <p class="section__abstract u-row">{{hotel.description}}</p>
    </section> 
    <transition-group name="slide" v-if="rooms.length > 0">
      <room-card @bookRoom="bookRoom(room)" v-for="room of visibleRooms" :key="room.id" :room="room" />
    </transition-group> 
    <div class="btnHolder btnHolder--tac">
      <a v-if="maxVisibleRooms!=rooms.length" class="btn btn--mb blue_bg" @click.prevent="showAllRooms"> show {{rooms.length -2}} more rooms</a>
    </div>
  </div>
</template>

<script>
import confirmationFormatter from "../modules/confirmationFormatter";
import Room from "@/components/Room.card.vue";
import { setToLocalCollection, labels } from "../modules/utils";
import { mapActions, mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
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
  components: {
    "room-card": Room,
    Carousel,
    Slide
  },
  methods: {
    labels,
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
<style lang="scss">
.VueCarousel {
  position: relative;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}
.VueCarousel-slide {
  height: 40vh;
  max-height: 400px;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.VueCarousel-pagination {
  position: absolute;
  bottom: 10px;
  z-index: 1;
}
.VueCarousel-navigation-next,
.VueCarousel-navigation-prev {
  transform: translateX(50px);
}
</style>

