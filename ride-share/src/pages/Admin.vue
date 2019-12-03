<template>
    <v-container>
        <div>
            <h4 class="display-1">Administrator</h4>
            <v-btn color="" class="" v-on:click="createVehicle">New Vehicle</v-btn>

            <v-btn color="primary" class="" v-on:click="update">Update Vehicle</v-btn>
<!--            <v-data-table-->
<!--                    class="elevation-1"-->
<!--                    v-bind:headers="headers"-->
<!--                    v-bind:items="rides"-->
<!--            >-->

<!--                <template v-slot:item.action="{ item }">-->
<!--                    <v-icon small @click="deleteVehicle(item)">-->
<!--                        mdi-delete-->
<!--                    </v-icon>-->
<!--                    <v-icon small class="ml-2" @click="editBehicle(item)">-->
<!--                        mdi-pencil-->
<!--                    </v-icon>-->
<!--                </template>-->
<!--            </v-data-table>-->
            <div class="text-xs-center">
                <v-dialog v-model="createVisible" width="800">
                    <v-card>
                        <v-card-title primary-title>
                            {{this.dialogHeader}}
                        </v-card-title>

                        <v-card-text>
                            {{this.dialogText}}
                            {{this.valid}}
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form v-model="valid">
                                <v-date-picker
                                        v-model="newRide.date"
                                        label="Date"
                                        prepend-icon="event"
                                        required
                                >
                                </v-date-picker>
                                <v-time-picker
                                        v-model="newRide.time"
                                        label="Time"
                                        required
                                ></v-time-picker>
                                <v-text-field
                                        v-model="newRide.distance"
                                        label="Ride Distance (miles)"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newRide.fuelprice"
                                        label="Fuel Price ($ per mile)"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="newRide.fee"
                                        label="Ride Fee ($)"
                                        required
                                ></v-text-field>
                                <v-autocomplete
                                        v-model="newRide.vehicleid"
                                        label="Vehicle"
                                        required
                                        :items=vehicles
                                        item-text=name
                                        item-value=id
                                ></v-autocomplete>
                                <v-autocomplete
                                        v-model="newRide.fromlocationid"
                                        label="Departing from"
                                        required
                                        :items=locations
                                        item-text=name
                                        item-value=id
                                ></v-autocomplete>
                                <v-autocomplete
                                        v-model="newRide.tolocationid"
                                        label="Arriving to"
                                        required
                                        :items=locations
                                        item-text=name
                                        item-value=id
                                ></v-autocomplete>
                            </v-form>
                        </v-card-text>


                        <v-card-actions>
                            <v-btn v-if="dialogType=='create'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="createRidePost"
                            >Create Ride
                            </v-btn>
                            <v-btn v-if="dialogType=='edit'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="editRideUpdate">
                                Edit Ride
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text v-on:click="hideDialog">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            </div>
    </v-container>
</template>

<script>
    export default {
        name: "Admin",
        created(){
            this.update();
        },
        // data: function(){
        //     return {
        //         newVehicle:{},
        //         dialogType:"",
        //         dialogHeader: "<no dialogHeader>",
        //         dialogText: "<no dialogText>",
        //         createVisible: false,
        //     }
        // },
        methods:{
            update:function(){
                this.$root.updateVehicle();

            },
            createVehicle: function(){
                // console.log("Create vehicle");
                // this.newVehicle = {};
                // this.dialogType = "create";
                // this.dialogHeader = "Create Vehicle";
                // this.dialogText = "Fill in the following values and submit to add a new vehicle.";
                // this.createVisible = true;
                console.log("Creating the vehicle-----------");
            }
        }
    }
</script>

<style scoped>

</style>