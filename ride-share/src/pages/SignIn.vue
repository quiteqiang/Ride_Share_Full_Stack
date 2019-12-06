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
      <v-btn color=primary :disabled=isLoggedIn  v-on:click="signIn">Sign In</v-btn>
      <br>
        <br>
        
      <h2>Sign Up As Rider</h2>
      <v-text-field
      label="First name"
      v-model="signUpFirstName"
      ></v-text-field>
      <v-text-field
      label="Last name"
      v-model="signUpLastName"
      ></v-text-field>
      <v-text-field
      label="Phone number"
      v-model="signUpPhoneNumber"
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
      signUpFirstName: "",
      signUpLastName: "",
      signUpPhoneNumber: "",

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
      let data = {
        firstName:this.signUpFirstName,
          lastName:this.signUpLastName,
          Phone:this.signUpPhoneNumber
      };
      console.log(data);
      this.$axios
        .post("/passengers", data)
        .then(result => {
        this.$root.updateUsers();     
          if (result.status === 200) {
            if (result.data.ok) {
              this.accountCreated = true;
              this.$root.rides.push(this.newRide)
              console.log(result);
            } else {
              console.log(result.err);
            }
          }
        })
        .catch(err => this.showDialog("Failed", err));
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
