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
              }
              this.rides =  result.data;
            // } else {
              // console.log("Failed to load rides: ");
              // console.log(result);

            // }
          }
        });
        //update this.rides
      },
      updateVehicles: function(){
        console.log("Updating vehicles...")
        this.$axios
        .get("vehicles/",{})
        .then(result=>{
          if (result.status === 200) {
            if (result.data.ok) {
              this.vehicles=[];
              let i = 0;
              for (i in result.data){
                this.vehicles.push(result.data[i]);
              }
              return this.vehicles;

            } else {
              
              this.showDialog("Sorry", result.data.msge);
              return (result.data.msge)
          }
          }
        })
      }
  },
  router,
  vuetify,
  render: h => h(App)
});
