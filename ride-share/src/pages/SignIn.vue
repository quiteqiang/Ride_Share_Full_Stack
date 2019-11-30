<template>
  <v-container>
    <div>
      <h2>Sign In Credentials</h2>

      <v-autocomplete
        label="Username"
        :items="allUsers"
        v-model="tempUser"
        
      ></v-autocomplete>

      <p v-if="currentUser==false">Currently not signed in</p>
      <p v-else> Currently signed in as {{ currentUser }}</p>
      <!-- <p>[Sign-in stuff goes here]</p> -->
      <v-btn color=primary v-on:click="signIn">Sign In</v-btn>
      <v-btn v-on:click="signOut">Sign Out</v-btn>
      <br>
        <br>
        
      <h2>Sign Up Credentials</h2>
      <v-text-field
      label="Username"
      v-model="tempSignUp"
      ></v-text-field>

      <v-btn  v-on:click="signUp">Sign Up</v-btn>
    </div>
    
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return{
      allUsers: ["Tim Swanson", "Rob Swanson"],
      tempUser: "",
      tempSignUp: "",
    } 
  },
  methods: {
    signIn: function() {
      this.$root.currentUser = this.tempUser;
      console.log(this.tempUser)
    },
    signOut: function() {
      this.$root.currentUser = null;
    },
    signUp: function(){
      this.$root.currentUser = this.tempUser;
    }
  },
  computed: {
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return false;
      }
    }
  },
  
};
</script>
