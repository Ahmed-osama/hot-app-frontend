import { types } from 'node-sass';

<template>
  <div 
      :class="
        `col-xs-12
        loading-div
        loading-div--row
        loading-div--centered
        loading-div--${type} ${classes}`" 
  ></div>
</template>


<script>
export default {
  name: "loading",
  props: {
    type: {
      type: String,
      default: "page"
    },
    classes: {
      type: String,
      default: ""
    }
  }
};
</script>