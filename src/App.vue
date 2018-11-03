import class from '@vue/cli-service';
<template>
  <div id="app">
    <main-header/>
    <main :class="classes">

      <router-view />
    </main>
    
  </div>
</template>

<script>
import MainHeader from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    "main-header": MainHeader
  },
  computed: {
    classes() {
      return { "container container--main": this.$route.path !== "/admin" };
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/styles.scss";
</style>
