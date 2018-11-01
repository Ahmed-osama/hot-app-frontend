
<template>
  <div class="about">
    <div v-if="newHotel">
      <h2>add hotel</h2>
      <input type="text" v-model="newHotel.name" placeholder="Hotel name"><br>
      <select multiple v-model="newHotel.aminites"><br>
              <option v-for="aminity in aminites" :key="aminity" :value="aminity">{{aminity}}</option>
            </select><br>
      <ul v-if="newHotel.images.length > 0">
        <li v-for="(img,i) in newHotel.images" :key="i">
          {{img}}
          <button @click="removeImg(i)">X</button>
        </li>
      </ul>
      <input type="text" v-model="newImg">
      <button @click="addImg()">+</button>
      <br>
      <label for="pricelvl">price Category</label>
      <select v-model="newHotel.price_category">
              <option v-for="priceCategory in priceCategoreis" :key="priceCategory" :value="priceCategory">{{priceCategory}}</option>
            </select><br>
      <label for="">rating</label> <input type="range" v-model="newHotel.rating" min="0" max="5">{{newHotel.rating}}<br>
      <label for="">distance to venue</label> <input type="number" v-model="newHotel.distance_to_venue" min="0" max="2000" step="100"><br>
      <label for="">Description </label> <textarea type="number" v-model="newHotel.description"></textarea><br>
      <button @click="addHotel">add hotel</button>
    </div>

    <div v-if="hotels.length > 0">
      <h2>Add Room</h2>
      <input type="text" v-model="newRoom.name"><br>
      <select v-model="newRoom.hotelId">
        <option v-for="hotel in hotels" :value="hotel.id" :key="hotel.id">{{hotel.name}}</option>
      </select><br>
      <textarea v-model="newRoom.description"></textarea><br>
      <input type="number" min="0" max="4" step="1" v-model="newRoom.max_occupancy"><br>
      <input type="number" min="0" max="2000" step="100" v-model="newRoom.price_in_usd"><br>
       <button @click="addRoom">add hotel</button>
    </div>
    <ul>
      <li v-for="(hotel,index) in hotels" :key="hotel.id">{{hotel.name}} <button @click="deleteHotel(hotel.id, index)">X</button></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import uuid from "uuid/v1";

export default {
  data() {
    return {
      hotels: [],
      aminites: [
        "free_parking",
        "free_wifi",
        "pets",
        "restaurant",
        "gym",
        "pool",
        "spa"
      ],
      priceCategoreis: ["low", "medium", "high"],
      newImg: "",
      newHotel: null,
      newRoom: null
    };
  },
  methods: {
    createNewHotel() {
      this.newHotel = {
        id: uuid(),
        aminites: [],
        name: "",
        images: [],
        description: "",
        distance_to_venue: "",
        rating: "",
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
      axios.delete(`http://localhost:3000/hotels/${id}`, {}).then(data => {
        this.hotels.splice(index, 1);
      });
    },
    addHotel() {
      axios.post(`http://localhost:3000/hotels/`, this.newHotel).then(data => {
        this.hotels.unshift(this.newHotel);
        this.createNewHotel();
      });
    },
    addRoom() {
      axios.post(`http://localhost:3000/rooms/`, this.newRoom).then(data => {
        this.createNewRoom();
      });
    }
  },
  mounted() {
    axios.get("http://localhost:3000/hotels").then(res => {
      this.hotels.push(...res.data);
    });
    this.createNewHotel();
    this.createNewRoom();
  }
};
</script>
