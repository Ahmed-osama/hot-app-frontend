
<template>
  <header>
    <ul id="nav">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/admin">admin</router-link></li>
    </ul>
    <p v-if="user">welcome! {{fullName}}
      <button @click="logOut">logout</button>
    </p>
    <ul v-if="logInfo && !user">
      <li>
        <label for="firstname">firstname</label> <input type="text" name="" v-model="logInfo.firstName" id="firstname">
      </li>
      <li>
        <label for="lastname">lastname</label> <input type="text" name="" v-model="logInfo.lastName" id="lastname">
      </li>
      <li>
        <button @click="logUserin(logInfo)">login</button>
      </li>
    </ul>

  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "main-header",
  data() {
    return {
      logInfo: false
    };
  },
  computed: {
    ...mapState(["user"]),
    fullName: function() {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  methods: {
    ...mapActions(["logUserin", "logUserout"]),
    createLogForm() {
      this.logInfo = {
        firstName: "John",
        lastName: "Doe"
      };
    },
    logOut() {
      this.logUserout();
      this.createLogForm();
    }
  },
  mounted() {
    if (!this.user) {
      let localUser = localStorage.getItem("user");
      localUser = localUser !== "undefined" ? JSON.parse(localUser) : false;
      if (localUser) {
        this.$store.commit("setState", {
          name: "user",
          value: localUser
        });
      } else {
        this.createLogForm();
      }
    }
  }
};
</script>

