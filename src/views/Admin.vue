
<template>
  <div class="flex">
    <div v-if="hotels.length > 0" class="col-md-4 u-page-height-scroll">
      <div class="heading heading--pt">
        <h3 class="heading__title">all hotels</h3>
      </div>
      <div v-for="(hotel,index) in hotels" :key="hotel.id" class="post-view post-view--horizontal post-view--horizontal-sm ">
        <div class="post-view__img">
          <img :src="require(`../assets/img/hotels/${hotel.images[0]}.jpg`)" />
        </div>
        <div class="post-view__caption">
          <h4 class="post-view__maxTitle">
            <router-link :to="`/hotel-detail/${hotel.id}`" :title="hotel.name">{{hotel.name}}</router-link>
          </h4>
          <button class="btn red_bg btn--xs" @click="deleteHotel(hotel.id, index)">remove</button>
        </div>
      </div>
  
    </div>
    <div class="col-md-8 u-page-height-scroll section--wh">
  
      <div v-if="newHotel" class="col-md-8">
        <div class="heading heading--pt  heading--borderbottom">
        <h3 class="heading__title">add hotel</h3>
      </div>
        <input type="text" v-model="newHotel.name" placeholder="Hotel name">
        <div class="heading heading--pt heading--borderbottom">
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


        <div class="heading heading--pt heading--borderbottom">
          <h4 class="heading__title heading__title--sm">add hotel images</h4>
        </div>

        <div v-if="newHotel.images.length > 0" class="u-row u-row--wrap">
          <span class="btn liteGry_bg" v-for="(img,i) in newHotel.images" :key="i">
            <span class="btn--block">{{img}}</span>
            <button @click="removeImg(i)" class="btn btn--xs red_bg btn--square btn--round">X</button>
          </span>
        </div>
        <div class="form-row">

        <input type="text" v-model="newImg">
        <button class="btn btn--mb green_bg" @click="addImg()">+</button>
        </div>
        <br>
        <label for="pricelvl">price Category</label>
        <select v-model="newHotel.price_category">
                  <option v-for="priceCategory in priceCategoreis" :key="priceCategory" :value="priceCategory">{{priceCategory}}</option>
                </select><br>
        <label for="">rating</label> <input type="range" v-model.number="newHotel.rating" min="0" max="5">{{newHotel.rating}}<br>
        <label for="">distance to venue</label> <input type="number" v-model.number="newHotel.distance_to_venue" min="0" max="2000" step="100"><br>
        <label for="">Description </label> <textarea type="number" v-model="newHotel.description"></textarea><br>
        <button @click="addHotel">add hotel</button>
      </div>
  
      <div v-if="hotels.length > 0 && newRoom">
        <h2>Add Room</h2>
        <input type="text" v-model="newRoom.name"><br>
        <select v-model="newRoom.hotelId">
            <option v-for="hotel in hotels" :value="hotel.id" :key="hotel.id">{{hotel.name}}</option>
          </select><br>
        <textarea v-model="newRoom.description"></textarea><br>
        <input type="number" min="0" max="4" step="1" v-model.number="newRoom.max_occupancy"><br>
        <input type="number" min="0" max="2000" step="100" v-model.number="newRoom.price_in_usd"><br>
        <button @click="addRoom">add hotel</button>
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
      newRoom: null
    };
  },
  computed: {
    ...mapState(["hotels"])
  },
  methods: {
    createNewHotel() {
      this.newHotel = {
        id: uuid(),
        amenities: [],
        name: "",
        images: [],
        description: "",
        distance_to_venue: 0,
        rating: 0,
        price_category: ""
      };
    },
    createNewRoom() {
      this.newRoom = {
        id: uuid(),
        name: "",
        description: "",
        max_occupancy: "",
        price_in_usd: "",
        hotelId: ""
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
      Axios.post(`hotels/`, this.newHotel).then(data => {
        this.$store.commit("addHotel", this.newHotel);
        this.createNewHotel();
      });
    },
    addRoom() {
      Axios.post(`rooms/`, this.newRoom).then(data => {
        this.createNewRoom();
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
