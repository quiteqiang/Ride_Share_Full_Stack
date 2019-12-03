import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import App from "./App.vue";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3000"
  baseURL: "http://localhost:3000"
});
Vue.prototype.$axios = axiosClient;

new Vue({
  el: "#app",
  data: {
    currentUser: null,
    rides:[],
    vehicles:[],
    locations:[],
    passengers:[],
  },
  computed: {

  },
  methods:{
      updateRides: function(){
        console.log("Updating Rides...")
        this.$axios
        .get("/rides", {})
        .then(result => {
          if (result.status === 200) {
            // if (result.data.ok) {
              this.rides=[];
              let i = 0;
              for (i in result.data){
                this.rides.push(result.data[i].firstName + " " + result.data[i].lastName);
                console.log("Result--------");
                console.log(result);
              }
              this.rides =  result.data;
          }
        });
        //update this.rides
      },
      updateVehicles: function(){
        console.log("Updating vehicles...")
        this.$axios 
        .get("/vehicles",{})
        .then(result=>{
          if (result.status === 200) {
            // if (result.data.ok) {
              this.vehicles=[];
              let i = 0;
              for (i in result.data){
                this.vehicles.push(result.data[i]);
                this.vehicles[i]["name"]=this.vehicles[i]["make"] + " " + this.vehicles[i]["model"];
              }
              console.log("Vehicles:");
              console.log(this.vehicles);

              return this.vehicles;

          }
          else {
            console.log(result.data);
            return (result.data.msge)
          }
        })
      },
      updateLocations: function(){
        console.log("Updating locations...")
        this.$axios 
        .get("/locations",{})
        .then(result=>{
          if (result.status === 200) {
            // if (result.data.ok) {
              this.locations=[];
              let i = 0;
              for (i in result.data){
                this.locations.push(result.data[i]);
              }
              console.log("Locations:");
              console.log(this.locations);

              return this.locations;
          }
          else {
            console.log(result.data);
            return (result.data.msge)
          }
        })
      },
<<<<<<< HEAD
=======
      updateUsers: function(){
        console.log("Updating users...")
        this.$axios 
        .get("/passengers",{})
        .then(result=>{
          if (result.status === 200) {
            // if (result.data.ok) {
              this.passengers=[];
              let i = 0;
              for (i in result.data){
                this.passengers.push(result.data[i]);
                this.passengers[i]["name"]=this.passengers[i]["firstName"] + " " + this.passengers[i]["lastName"];

              }
              console.log("Passengers:");
              console.log(this.passengers);

              return this.passengers;

            // } else {
              // console.log(result.data);
              // return (result.data.msge)
          // }
          }
          else {
            console.log(result.data);
            return (result.data.msge)
          }
        })
      },
      
>>>>>>> 7c5f6d0144d60e0286c8f2b666a6c1b4a30ab945
  },
  router,
  vuetify,
  render: h => h(App)
});
