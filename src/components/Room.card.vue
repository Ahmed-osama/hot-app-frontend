
<template>
  <div class="post-view post-view--horizontal ">
    <div class="post-view__img">
      <img :alt="room.name" :src="require(`../assets/img/hotels/${room.image}.jpg`)" />
    </div>
    <div class="post-view__caption">
      <h4 class="post-view__maxTitle">{{room.name}}</h4>
      <p class="post-view__abstract">
        {{room.description}}
      </p>
    </div>
    <div class="post-view__actions">
      <strong class="post-view__price">{{room.price_in_usd}}$</strong>
      <p class="post-view__occupancy">total for {{room.max_occupancy}} Persons</p>
      <a @click.prevent="bookRoom" class="post-view__cta btn green_bg">book now</a>
    </div>
  </div>
</template>


<script>
export default {
  name: "room-card",
  props: {
    room: {
      type: Object
    }
  },
  methods: {
    bookRoom: function() {
      this.$emit("bookRoom");
    }
  }
};
/* eslint-disable */
</script>