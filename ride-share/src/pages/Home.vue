<template>
  <v-container>
    <div>
      <h4 class="display-1">Welcome to TQ ride share!</h4>
      <p class="body-1">Sign in to view your rides as Driver</p>
<!--//      <v-toolbar-title v-if="isDriver">Hello Driver: {{ currentUser.name }}</v-toolbar-title>-->
      <v-toolbar-title>Hello: {{ currentUser.name }}</v-toolbar-title>
      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >
      </v-data-table>
      <Vehicle_type></Vehicle_type>
      <Home_Rides></Home_Rides>
      <Home_Passager></Home_Passager>
      <Home_Driver></Home_Driver>
    </div>
  </v-container>
</template>
<script>
  import Vehicle_type from "../components/Vehicle_type";
  import Home_Rides from "../components/Home_Rides";
  import Home_Passager from "../components/Home_Passager";
  import Home_Driver from "../components/Home_Driver";
export default {
  created(){
    this.update();
  },
  components:{
    "Vehicle_type":Vehicle_type,
    "Home_Rides":Home_Rides,
    "Home_Passager":Home_Passager,
    "Home_Driver":Home_Driver,
  },
  data: function() {
      return {
        headers: [
          { text: "From", value: "fromlocationid" },
          { text: "To", value: "tolocationid" },
          { text: "Distance", value: "distance" },
          { text: "Departure Date", value: "date" },
          { text: "Departure Time", value: "time" },
          { text: "Vehicle", value: "vehicleid" },
        ],
      }
  },
  methods:{
    update: function(){
      this.$root.updateRides();
    },
  },
  computed: {
    rides: function() {
      if (this.$root.rides) {
        return this.$root.rides;
      } else {
        return false;
      }
    },
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
      drivers: function(){
        if (this.$root.driver) {
          return this.$root.driver;
        } else {
          return false;
        }
      },
      isLoggedIn: function(){
        if (this.$root.currentUser){
          return true;
        }
        return false;
      },
    isDriver:function(){
      if (this.$root.currentUser in this.$root.driver){
        return true;
      }
      return false;
    },
    // isPassager:function(){
    //   if (this.$root.currentUser in this.$root.user){
    //     return true;
    //   }
    //   return false;
    // }
  }
}
</script>
