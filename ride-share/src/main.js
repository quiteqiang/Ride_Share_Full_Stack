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
    vehicleType:[],
    drivers:[],
    drivingRides:[],
    ridingRides:[],
    currentDriver:{},
  },
  computed: {
  },
  methods:{
      // updateCurrentDriver: function(){
      //   console.log("Updating current driver...");
          
      // },
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
              }
              this.rides =  result.data;
              console.log(this.rides);
          }
        });
        //update this.rides
      },
      updateDrivers: function(){

          this.$axios
              .get("/drivers", {})
              .then(result => {

                console.log(result);
                  if (result.status === 200) {
                      this.drivers=[];
                      let i = 0;
                      for (i in result.data){
                          this.drivers.push({
                            name:result.data[i].firstname + " " + result.data[i].lastname,
                            firstName:result.data[i].firstname,
                            lastName:result.data[i].lastname,
                            phone:result.data[i].phone,
                            licenseNumber:result.data[i].licensenumber,



                          });
                      }
                      console.log("Drivers Updated");
                      console.log(this.drivers);
                      // this.drivers =  result.data;
                      


                  }
              });
      },
      updateVehicles: function(){
        // console.log("Updating vehicles...")
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
        // console.log("Updating locations...")
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
        // console.log("Updating users...")
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
          }
          else {
            
            return (result.data.msge)
          }
        })
      },
      updateVehicleType: function(){
          this.$axios
              .get("/vehicle_type", {})
              .then(result => {
                  if (result.status === 200) {
                      // if (result.data.ok) {
                        console.log("Updating Vehicle_Type...")
                        console.log(result.data);
                      this.vehicleType=result.data;
                      // let i = 0;
                      // for (i in result.data){
                          // this.vehicle_type.push(result.data[i].firstName + " " + result.data[i].lastName);
                          // console.log("Result--------");
                          // console.log(result);
                      // }
                      // console.log(this.vehicle_type);
                      // result.data=this.vehicle_type;
                  }
                  else {
                    console.log("Error!");
                  }
              });
          //update this.rides
      },
      updateDrivingRides: function(){
        this.$axios
              .get("/drivers/"+this.currentUser.id+"/rides", {})
              .then(result => {
                console.log("Driving Rides:");
                console.log(result);
                  if (result.status === 200) {
                    console.log("Driving Rides");
                    console.log(result.data);
                    this.drivingRides=result.data;
                  }
              });
      },
      updateRidingRides: function(){
        this.$axios
              .get("/riders/"+this.currentUser.id+"/rides", {})
              .then(result => {
                console.log("Riding Rides:");
                console.log(result);
                  if (result.status === 200) {
                    console.log("riding Rides");
                    console.log(result.data);
                    this.ridingRides=result.data;
                  }
              });
            }
      },
  router,
  vuetify,
   render: h => h(App)

});
