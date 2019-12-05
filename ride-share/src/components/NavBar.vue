<template>
  <v-app-bar app dark color="primary">
    <router-link v-bind:to="{ name: 'home-page' }">
      <v-toolbar-title class="white--text">
        QT Ride Share
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <!-- <v-btn text v-bind:to="{ name: 'sign-up' }">Sign Up</v-btn> -->
    <!-- <v-btn text v-bind:to="{ name: 'sign-in' }">Sign In</v-btn> -->
    <!-- <v-btn text v-bind:to="{ name: 'home-page' }">Home</v-btn> -->
    <v-btn text v-bind:to="{ name: 'rides' }">Rides</v-btn>
    <v-btn text v-if="currentUser" v-bind:to="{ name: 'admin' }">Admin</v-btn>
    <v-btn v-if="!currentUser" text v-bind:to="{ name: 'sign-in' }">Sign In</v-btn>

    <v-menu v-if="currentUser" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <span v-if="currentUser">{{currentUser.name}}</span>
          <span v-else> Sign In </span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <!-- <v-list-item  v-if="!currentUser" v-bind:to="{ name: 'sign-in' }">
          <v-list-item-title>Sign In</v-list-item-title>
        </v-list-item>
        <v-list-item  v-if="!currentUser" v-bind:to="{ name: 'sign-up' }">
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item> -->
        <v-list-item v-if="currentUser" v-on:click="signOut">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name:"NavBar",
  methods: {
    signOut: function() {
      this.$root.currentUser = null;
    },
    signIn: function() {
      this.$root.currentUser = "A User";
    },
  },
  computed: {
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return false;
      }
    }
  } 
};
</script>