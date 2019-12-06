<template>
    <v-container>
        <div>
            <p class="body-1">All Rides</p>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="rides"
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
        }
    }
</script>