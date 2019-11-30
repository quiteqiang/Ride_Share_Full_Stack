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
    rides:[{
      id: 1,
      date: "1/1/1",
      time: "1:00:00",
      distance: 5,
      fuelPrice: 5,
      fee: 5,
      vehicleId: 4,
      fromLocationId: 5,
      toLocationId: 6,
    }],
  },
  computed: {

  },
  methods :{
      updateRides: function(){
        console.log("Updating Rides...")
        //update this.rides
      }
  },
  router,
  vuetify,
  render: h => h(App)
});
