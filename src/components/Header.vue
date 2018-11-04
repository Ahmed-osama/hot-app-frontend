
<template>
<header class="main-header">
      <div class="main-header__container"><router-link to="/" class="main-header__logo" >
        <img class="u-hide-sm" :src="require('../assets/img/logo-wide.png')"/>
        <img class="u-hide-lg" :src="require('../assets/img/logo.png')"/>
      </router-link>
      <a class="main-header__menuToggler"  :class="{'main-header__menuToggler--active':isMenuActive}"  @click.prevent="toggleMenu">
        <span></span><span></span><span></span></a>
        <div class="main-header__sideMenu" :class="{'main-header__sideMenu--active':isMenuActive}">
          <nav class="main-header__nav">
            <!-- <ul class="main-header__navList">
               <li><router-link to="/">Home</router-link></li>
              <li></li>
            </ul> -->
          </nav>
          <p v-if="user" class="main-header__user" >
            welcome! {{fullName}}
            <button @click="logOut" class="btn btn--xs red_bg main-header__userLogout">logout</button>
            <router-link to="/admin" class="btn btn--xs blue_bg main-header__userLogout">admin</router-link>
          </p>
          <section v-if="logInfo && !user" class="main-header__user">
            <div class="form-row form-row--vert">
              <input  class="input--nomb input--sm" type="text" name="" v-model="logInfo.firstName" id="firstname">
            </div>
            <div  class="form-row form-row--vert">
              <input  class="input--nomb input--sm" type="text" name="" v-model="logInfo.lastName" id="lastname">
            </div>
            <div  class="form-row form-row--vert">
              <button @click="logUserin(logInfo)" class="btn btn--sm  green_bg">login</button>
            </div>
          </section>
        </div>
        <div class="main-header__menuCloser" :class="{'main-header__menuCloser--active':isMenuActive}" @click="closeMenu"></div>
      </div>
    </header>


  
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "main-header",
  data() {
    return {
      logInfo: false,
      isMenuActive: false
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
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu() {
      this.isMenuActive = false;
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

