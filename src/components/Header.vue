
<template>
<header class="main-header">
      <div class="main-header__container"><a class="main-header__logo" href="index-en.html">
        <img class="u-hide-sm" src="../assets/img/logo-wide.png"/>
        <img class="u-hide-lg" src="../assets/img/logo-wh.png"/>
      </a>
      <a class="main-header__menuToggler"  :class="{'main-header__menuToggler--active':isMenuActive}"  @click.prevent="toggleMenu">
        <span></span><span></span><span></span></a>
        <div class="main-header__sideMenu" :class="{'main-header__sideMenu--active':isMenuActive}">
          <nav class="main-header__nav">
            <ul class="main-header__navList">
               <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/admin">admin</router-link></li>
            </ul>
          </nav>
          <p v-if="user">welcome! {{fullName}}
            <button @click="logOut" class="btn btn--sm red_bg">logout</button>
          </p>
          <section v-if="logInfo && !user">
            <div class="form-row form-row--vert">
              <label for="firstname">firstname</label> <input type="text" name="" v-model="logInfo.firstName" id="firstname">
            </div>
            <div  class="form-row form-row--vert">
              <label for="lastname">lastname</label> <input type="text" name="" v-model="logInfo.lastName" id="lastname">
            </div>
            <div  class="form-row form-row--vert">
              <button @click="logUserin(logInfo)" class="btn btn--sm green_bg">login</button>
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

