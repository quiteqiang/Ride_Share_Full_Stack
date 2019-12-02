<template>
  <v-container>
    <div>
      <h2>Sign In Credentials</h2>

      <v-autocomplete
        @click="updateUsers"
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
      tempUser: "",
      tempSignUp: "",
      allUsers: [],
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
    },
    updateUsers: function(){
      this.$axios
        .get("/passengers", {})
        .then(result => {
          if (result.status === 200) {
            if (result.data.ok) {
              let i = 0;
              for (i in result.data){
                this.allUsers[i] = result.data[i].firstName + " " + result.data[i].lastName;
              }
              this.allUsers =  result.data;
            } else {
              console.log("Failed to load users: ");
              console.log(result.err);

            }
          }
        })
        .catch(err => {
          console.log("Failed to load users: " + err);
          });

    }
  },
  computed: {
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return false;
      }
    },
    
  },
  
};
</script>
