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
    vehicle_type:[],
    drivers:[],
  },
  computed: {

  },
  methods:{
      updateRides: function(){
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
              
              

              return this.vehicles;
          }
          else {
            
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
              
              

              return this.locations;
          }
          else {
            
            return (result.data.msge)
          }
        })
      },
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
              
              

              return this.passengers;

            // } else {
              // 
              // return (result.data.msge)
          // }
          }
          else {
            
            return (result.data.msge)
          }
        })
      },
      updateVehicleType: function(){
          console.log("Updating Vehicle_Type...")
          this.$axios
              .get("/vehicle_type", {})
              .then(result => {
                  if (result.status === 200) {
                      // if (result.data.ok) {
                      this.vehicle_type=[];
                      let i = 0;
                      for (i in result.data){
                          this.vehicle_type.push(result.data[i].firstName + " " + result.data[i].lastName);
                          console.log("Result--------");
                          console.log(result);
                      }
                      this.vehicle_type =  result.data;
                  }
              });
          //update this.rides
      },
      updateDrivers: function(){
        this.$axios
        .get("/drivers", {})
        .then(result => {
          if (result.status === 200) {
              this.drivers=[];
              let i = 0;
              for (i in result.data){
                this.drivers.push(result.data[i].firstName + " " + result.data[i].lastName);
              }
              this.drivers =  result.data;
            
          }
        });
      }
  },
  router,
  vuetify,
  render: h => h(App)
});
