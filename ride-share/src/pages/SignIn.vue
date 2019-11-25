<template>
  <v-container>
    <div>
      <p>{{ currentUser }}</p>
      <p>[Sign-in stuff goes here]</p>
      <v-btn v-on:click="fakeSignIn">Fake Sign In</v-btn>
      <v-btn v-on:click="fakeSignOut">Fake Sign Out</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
  methods: {
    fakeSignIn: function() {
      this.$root.currentUser = "A User";
    },
    fakeSignOut: function() {
      this.$root.currentUser = null;
    }
  },
  computed: {
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return "No one logged in";
      }
    }
  }
};
</script>
