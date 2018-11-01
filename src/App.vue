<template>
  <div id="app">
    <main-header/>
    <router-view/>
  </div>
</template>
<script>
import MainHeader from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    "main-header": MainHeader
  }
};
</script>
<style lang="scss">
</style>
