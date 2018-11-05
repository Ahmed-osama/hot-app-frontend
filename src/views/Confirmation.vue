import class from '@vue/cli-service';
import class from '@vue/cli-service';

<template>
  <transition-group name="fade">

    <section key="confirmation" v-if="confirmation" class="section section--wh section--mb section--fp">
    
      <h3 class="section__mainTitle">welcome <strong>{{confirmation.guest}}</strong></h3>
    
      <p class="u-row u-wrap">
        <span>this is you booking confirmation for</span> <strong class="blue_color">{{confirmation.room.name}} </strong> <span>in</span>
        <strong class="blue_color">{{confirmation.hotel.name}}</strong> hotel
      </p>
      <p class="row u-row">
        <strong class="col-sm-3">
                  confirmation id : 
                </strong>
        <pre class="col-sm-8 gry_border u-pd-10 ">{{confirmation.id}}</pre>
      </p>
      <p class="u-row">
        <strong>
                  Hotel rating : 
                </strong>
        <span class="btn btn--fwb btn--sm liteGry_bg">{{confirmation.hotel.rating}}</span>
      </p>
    
      <p class="u-row u-wrap">
        <strong class="btn--mb">
                  Hotel aminites : 
                </strong>
        <span class="btn btn--sm btn--mb liteGry_border" v-for="amn in confirmation.hotel.amenities" :key="amn">
        <img class="u-icon post-view__liIcon" :src="require(`../assets/img/icons/${amn}.svg`)"/>
                    
                      {{amn}}
                    </span>
      </p>
    
      <p class="u-row">
        <strong class="green_color">
                  {{confirmation.room.price_in_usd+"$"}}
                </strong>
        <span>
                  total for <strong>2</strong> nights and
                </span>
        <strong>{{confirmation.room.max_occupancy}}</strong> Persons
      </p>
    
      <router-link :to="`/hotel-detail/${confirmation.hotelId}`" class="btn btn--block btn--nomb green_bg">check hotel page</router-link>
    
    
    </section>
    
  
    <div class="msg msg--error" key="eror" v-if="confirmationRequestErr">
      <p> couldn't load hotel confirmation plz make sure you connection is working</p>
    </div>
    <loading v-if="!confirmation && confirmationIsLoading && !confirmationRequestErr" key="loading" />
  </transition-group>
</template>

<script>
// @ is an alias to /src

import { Axios } from "@/modules/axios";
import loading from "@/components/loading.vue";
export default {
  name: "home",
  components: {
    loading
  },
  data() {
    return {
      confirmation: null,
      confirmationRequestErr: false,
      confirmationIsLoading: true
    };
  },
  methods: {
    loadConfirmation() {
      let confirmations = JSON.parse(localStorage.getItem("confirmations"));
      if (confirmations[this.$route.params.confirmationId]) {
        this.confirmation = confirmations[this.$route.params.confirmationId];
        self.confirmationIsLoading = false;
      } else {
        let self = this;
        Axios.get(`confirmations/${this.$route.params.confirmationId}`)
          .then(res => {
            this.confirmation = res.data;
            self.confirmationIsLoading = false;
          })
          .catch(() => {
            self.confirmationRequestErr = true;
            self.confirmationIsLoading = false;
          });
      }
    }
  },
  mounted() {
    this.loadConfirmation();
  }
};
</script>
