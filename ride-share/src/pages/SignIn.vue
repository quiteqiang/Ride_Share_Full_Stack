<template>
  <v-container>
    <div>
      <h2>Sign In Credentials</h2>
  
      <v-autocomplete
        @click="update"
        label="Username"
        :items=users
        item-text=name
        item-value=id
        v-model="tempUser"
        
      ></v-autocomplete>

      <p v-if="currentUser==false">Currently not signed in</p>
      <p v-else> Currently signed in as {{ currentUser.name }}</p>
      <!-- <p>[Sign-in stuff goes here]</p> -->
      <v-btn color=primary :disabled=isLoggedIn  v-on:click="signIn">Sign In</v-btn>
      <!-- <v-btn v-on:click="signOut" :disabled=!currentUser>Sign Out</v-btn> -->
      <br>
        <br>
        
      <h2>Sign Up As Rider</h2>
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
  created(){
    this.update();
  },
  data() {
    return{
      tempUser: "",
      tempSignUp: "",
      allUsers: [],
    } 
  },
  methods: {
    update: function(){
      console.log("Updating...")
      this.$root.updateUsers();
    },
    signIn: function() {
      let i={};
      for (i of this.users){
        if (i.id==this.tempUser){
          this.$root.currentUser = i;
          break;
        }
      }
      console.log(this.tempUser)
    },
    signOut: function() {
      this.$root.currentUser = null;
    },
    signUp: function(){
      this.$root.currentUser = this.tempUser;
    },
    
  },
  computed: {
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return false;
      }
    },
    users: function(){
      if (this.$root.passengers) {
        return this.$root.passengers;
      } else {
        return false;
      }
    },
    isLoggedIn: function(){
      if (this.$root.currentUser){
        return true;
      }
      return false;
    }
    
  },
  
};
</script>
