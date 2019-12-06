<template>
    <v-container>
        <div>
            <p class="body-1">All Passengers</p>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="passengers"
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
                    { text: "First Name", value: "firstName" },
                    { text: "Last Name", value: "lastName" },
                    { text: "Phone", value: "Phone" },
                ],
            }
        },
        methods:{
            update: function(){
                this.$root.updateUsers();
            },
        },
        computed: {
            passengers:function(){
                if (this.$root.passengers) {
                    return this.$root.passengers;
                } else {
                    return false;
                }
            },
        }
    }
</script>