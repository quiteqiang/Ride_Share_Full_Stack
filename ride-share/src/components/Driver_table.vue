<template>
    <v-container>
        <div>
            <p v-if="ridingRides.length>0" class="body-1">Signed up to ride:</p>
            <!--//      <v-toolbar-title v-if="isDriver">Hello Driver: {{ currentUser.name }}</v-toolbar-title>-->
            <!-- <v-toolbar-title>Hello: {{ currentUser.name }}</v-toolbar-title> -->
            <v-data-table
                    v-if="ridingRides.length>0"
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="ridingRides"
            >
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
    export default {
        created(){
            this.update();
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
                // this.$root.updateRides();
                // this.$root.updateVehicles();
                // this.$root.updateDrivers();
                // this.$root.updateLocations();
                // this.$root.updateRidingRides();

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
            ridingRides:function(){
                return this.$root.ridingRides;
            }
            // isPassager:function(){
            //   if (this.$root.currentUser in this.$root.user){
            //     return true;
            //   }
            //   return false;
            // }
        }
    }
</script>