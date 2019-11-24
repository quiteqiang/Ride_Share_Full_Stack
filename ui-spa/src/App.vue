<template>
  <v-app>
    <nav-bar />
    <v-content>
      <v-container> <router-view></router-view> </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-layout justify-center class="font-weight-thin">
        &copy; {{ new Date().getFullYear() }} Wry and Feckless Morale Boosters,
        LLC&mdash;A Firegraph Company
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
