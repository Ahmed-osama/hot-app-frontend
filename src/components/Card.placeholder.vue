
<template>
  <div>
    <div class="row">
      <div :key="item" v-for="item in count" class="col-md-4">
        <div class="placeholder placeholder--card"></div>
      </div>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import { mapState } from "vuex";
import { labels } from "../modules/utils";

export default {
  name: "hotel-card",
  props: {
    count: {
      type: Number,
      default: 6
    }
  }
};
/* eslint-disable */
</script>
