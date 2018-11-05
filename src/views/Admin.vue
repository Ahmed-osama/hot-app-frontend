
<template>
  <div class="flex row row--padding">
    <div v-if="hotels.length > 0" class="col-md-4  col-xs-12 u-page-height-scroll">
      <div class="heading heading--pt">
        <h3 class="heading__title ">all hotels</h3>
      </div>
      <div v-for="(hotel,index) in hotels" :key="hotel.id" class="post-view post-view--horizontal post-view--horizontal-sm ">
        <div class="post-view__img">
          <img v-if="hotel.images[0]!== undefined" :src="require(`../assets/img/hotels/${hotel.images[0]}.jpg`)" />
        </div>
        <div class="post-view__caption">
          <h4 class="post-view__maxTitle">
            <router-link :to="`/hotel-detail/${hotel.id}`" :title="hotel.name">{{hotel.name}}</router-link>
          </h4>
          <button class="btn red_bg btn--xs" @click="deleteHotel(hotel.id, index)">remove</button>
        </div>
      </div>
    </div>

    <div class="col-md-8  col-xs-12 u-page-height-scroll section--wh">
  
      <div v-if="newHotel" class="col-md-8">
        <div class="heading heading--pt  heading--borderbottom">
          <h3 class="heading__title green_color">add hotel</h3>
        </div>
        <p class="msg msg--note">
          admin panel have the best exprince on desctop and large screens
        </p>
        <input type="text" v-model="newHotel.name" placeholder="Hotel name">
        <div class="heading heading--pt heading--borderTop">
          <h4 class="heading__title heading__title--sm">add hotel amenities</h4>
        </div>
        <ul class="row">
          <li v-for="ameniti of amenities" :key="ameniti" class="input-checkbox_-row col-sm-4">
            <span class="input-checkbox">
              <input  class="input-checkbox__input"  type="checkbox" :id="'amenities'+ameniti" :value="ameniti" v-model="newHotel.amenities">
              <span class="input-checkbox__preview"></span>
            </span>
            <label class="input-checkbox_-_label" :for="'amenities'+ameniti">{{ameniti}}</label>
          </li>
        </ul>
        <div class="heading heading--pt heading--borderTop">
          <h4 class="heading__title heading__title--sm">add hotel images</h4>
        </div>
        <div v-if="newHotel.images.length > 0" class="u-row u-row--wrap">
          <span class="btn liteGry_bg btn--sm btn--round" v-for="(img,i) in newHotel.images" :key="i">
            <span class="btn--block">image - {{img}}</span>
          <button @click="removeImg(i)" class="btn btn--xs red_bg btn--square btn--round">X</button>
          </span>
        </div>
        <div class="form-row">
          <input type="text" v-model="newImg">
          <button class="btn btn--mb green_bg" @click="addImg()">+</button>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="heading heading--pt heading--borderTop">
              <h4 class="heading__title heading__title--sm">select hotel price category</h4>
            </div>
            <select v-model="newHotel.price_category">
              <option v-for="(priceCategory,index) in priceCategoreis" :selected="index === 1" :key="priceCategory" :value="priceCategory">{{priceCategory}}</option>
            </select>
          </div>
          <div class="col-sm-6">
            <div class="heading heading--pt heading--borderTop">
              <h4 class="heading__title heading__title--sm">set hotel rating</h4>
            </div>
            <input type="range" v-model.number="newHotel.rating" min="0" max="5">{{newHotel.rating}}
          </div>
        </div>
        <div class="heading heading--pt heading--borderTop">
          <h4 class="heading__title heading__title--sm">set hotel distance to venue</h4>
        </div>
        <input type="number" v-model.number="newHotel.distance_to_venue" min="0" max="2000" step="100">
  
        <div class="heading heading--pt heading--borderTop">
          <h4 class="heading__title heading__title--sm">fill hotel Description</h4>
        </div>
        <textarea type="number" v-model="newHotel.description"></textarea>
        <p class="msg msg--error">
          plz make sure you fill all the inputs correctlly as form validation in not active yet !
        </p>
        <button class="btn btn--block green_bg btn--mb" :class="{'btn--loading':addHotelLoading}" @click="addHotel">add hotel</button>
      </div>
  
      <div v-if="hotels.length > 0 && newRoom" class="section section--bt">
        <div class="heading heading--pt heading--borderTop">
          <h3 class="heading__title green_color">Add Room</h3>
        </div>
        <div class="col-md-8">
  
          <input type="text" v-model="newRoom.name" placeholder="add room name">
          <div class="heading heading--pt heading--borderTop">
            <h4 class="heading__title heading__title--sm">select hotel</h4>
          </div>
          <select v-model="newRoom.hotelId">
                  <option v-for="hotel in hotels" :value="hotel.id" :key="hotel.id">{{hotel.name}}</option>
              </select>
  
  
          <div class="heading heading--pt heading--borderTop">
            <h4 class="heading__title heading__title--sm">descript the room</h4>
          </div>
          <textarea v-model="newRoom.description"></textarea>
          <div class="heading heading--pt heading--borderTop">
            <h4 class="heading__title heading__title--sm">Add image number</h4>
          </div>
          <input type="text" v-model="newRoom.image">
  
          <div class="heading heading--pt heading--borderTop">
            <h4 class="heading__title heading__title--sm">Price & distance</h4>
          </div>
          <div class="row">
            <div class="col-sm-6"> <input placeholder="max occupancy" type="number" min="0" max="4" step="1" v-model.number="newRoom.max_occupancy"></div>
            <div class="col-sm-6"><input placeholder="price in usd" type="number" min="0" max="2000" step="100" v-model.number="newRoom.price_in_usd"></div>
          </div>
          <p class="msg msg--error">
            plz make sure you fill all the inputs correctlly as form validation in not active yet !
          </p>
          <button class="btn btn--block green_bg btn--mb" :class="{'btn--loading':addRoomLoading}" @click="addRoom">Add Room</button>
        </div>
      </div>
    </div>
  
  
  </div>
</template>

<script>
import uuid from "uuid/v1";
import { amenities, price_category } from "../modules/constants";
import { Axios } from "@/modules/axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      amenities,
      priceCategoreis: price_category,
      newImg: "",
      newHotel: null,
      newRoom: null,
      addHotelLoading: false,
      addRoomLoading: false
    };
  },
  computed: {
    ...mapState(["hotels"])
  },
  methods: {
    createNewHotel() {
      this.newHotel = null;
      this.newHotel = {
        id: uuid(),
        amenities: ["gym", "pool"],
        name: "Newly created hotel",
        images: [1, 2, 3],
        description: "dummy description to save you some clicks :)",
        distance_to_venue: 110,
        rating: 4,
        price_category: "low"
      };
    },
    createNewRoom() {
      this.newRoom = null;
      this.newRoom = {
        id: uuid(),
        name: "just created new room",
        description: "dummy description to save you some clicks :) again",
        max_occupancy: 2,
        price_in_usd: 200,
        hotelId: "",
        image: 1
      };
    },
    addImg() {
      this.newHotel.images.push(this.newImg);
      this.newImg = "";
    },
    removeImg(index) {
      this.newHotel.images.splice(index, 1);
    },
    deleteHotel(id, index) {
      Axios.delete(`hotels/${id}`, {}).then(data => {
        this.$store.commit("removeHotel", index);
      });
    },
    addHotel() {
      this.addHotelLoading = true;
      Axios.post(`hotels/`, this.newHotel).then(data => {
        this.$store.commit("addHotel", this.newHotel);
        this.createNewHotel();
        this.addHotelLoading = false;
      });
    },
    addRoom() {
      this.addRoomLoading = true;
      Axios.post(`rooms/`, this.newRoom).then(data => {
        this.createNewRoom();
        this.addRoomLoading = false;
      });
    },
    ...mapActions(["getHotels"])
  },
  mounted() {
    this.getHotels();
    this.createNewHotel();
    this.createNewRoom();
  }
};
</script>
