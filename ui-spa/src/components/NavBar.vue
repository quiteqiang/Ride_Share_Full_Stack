<template>
  <v-app-bar app dark color="primary">
    <router-link v-bind:to="{ name: 'home-page' }">
      <v-toolbar-title class="white--text">
        Single Page App
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn text v-bind:to="{ name: 'sign-up' }">Sign Up</v-btn>
    <v-btn text v-bind:to="{ name: 'sign-in' }">Sign In</v-btn>
    <v-btn text v-bind:to="{ name: 'about-us' }">About Us</v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <span>Admin</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'accounts' }">
          <v-list-item-title>Accounts</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
