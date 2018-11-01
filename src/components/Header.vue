<template>
  <ul id="nav">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/hotel-detail/123">Hotel details</router-link></li>
    <li><router-link to="/confirmation/123/542">confirmation</router-link></li>
    <li><router-link to="/admin">admin</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "main-header"
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
