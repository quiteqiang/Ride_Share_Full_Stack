<template>
    <v-container>
        <div>
            <p class="body-1">All Drivers</p>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="drivers"
            >
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
    export default{
        created(){
            this.update();
        },
        data:function(){
            return {
                headers: [
                    { text: "First Name", value: "firstname" },
                    { text: "Last Name", value: "lastname" },
                    { text: "Phone", value: "phone" },
                    { text: "License Number", value: "licensenumber" },
                ],
            }
        },
        methods:{
            update: function(){
                this.$root.updateDrivers();
                console.log("000000000000000");
            }
        },
        computed:{
            drivers: function(){
                if (this.$root.drivers) {
                    console.log(this.$root.drivers);
                    return this.$root.drivers;
                } else {
                    return false;
                }
            },
        }
    }
</script>