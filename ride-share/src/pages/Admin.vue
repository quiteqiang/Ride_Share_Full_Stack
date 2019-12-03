<template>
    <v-container>
        <div>
            <h4 class="display-1">Administrator</h4>
            <v-btn color="" class="" v-on:click="createVehicle">New Vehicle</v-btn>

            <v-btn color="primary" class="" v-on:click="update">Update Vehicle</v-btn>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="rides"
            >

                <template v-slot:item.action="{ item }">
                    <v-icon small class="ml-2" @click="driveClicked(item)">
                        mdi-seat
                    </v-icon>
                    <v-icon small class="ml-2" @click="driveClicked(item)">
                        mdi-steering
                    </v-icon>
                    <v-icon small class="ml-2" @click="editRide(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteClicked(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <div class=" text-xs-center">
                <confirm
                        :show=showConfirm
                        :header=confirmHeader
                        @confirm="confirmFunction"
                        @cancel="cancelConfirm"
                ></confirm>
                <v-dialog v-model="createVisible" width="500">
                    <v-card>
                        <v-card-title>
                            {{this.dialogHeader}}
                        </v-card-title>
                        <v-card-text>
                            {{this.dialogText}}
                            {{this.valid}}
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form v-model="valid">
                                <v-text-field
                                    v-model="newVehicle.makeyear"
                                    label = "Make"
                                    required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.model"
                                        label = "Model"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.color"
                                        label = "Color"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.vehicletypeid"
                                        label = "V_typeid"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.capacity"
                                        label = "Capacity"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.mpg"
                                        label = "Mpg"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.licenseState"
                                        label = "License State"
                                        required
                                >
                                </v-text-field>
                                <v-text-field
                                        v-model="newVehicle.licensenumber"
                                        label = "License Number"
                                        required
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn v-if="dialogType=='create'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="addVehiclePost"
                            >Create Ride
                            </v-btn>
<!--                            <v-btn v-if="dialogType=='edit'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="editRideUpdate">-->
<!--                                Edit Ride-->
<!--                            </v-btn>-->
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
        data: function(){
            return {
                headers:[
                    {text:"Make", value: "makeyear"},
                    {text:"Model", value: "model"},
                    {text:"Color",value:"color"},
                    {text:"Capacity",value:"capacity"},
                    {text:"Mpg",value:"mpg"},
                    {text:"License State",value:"licensestate"},
                    {text:"License Number",value:"licensenumber"}
                ],
                newVehicle:{},
                dialogType:"",
                dialogHeader: "<no dialogHeader>",
                dialogText: "<no dialogText>",
                dialogVisible: false,
                createVisible: false,

                showConfirm: false,
                confirmHeader: "",
                confirmFunction: this.addVehicle,

                valid: false,
            }
        },
        methods:{
            update:function(){
                this.$root.updateVehicle();
            },
            createVehicle: function(){
                console.log("Create Vehicle");
                //this.update();
                this.newVehicle = {};
                this.dialogType = "create";
                this.dialogHeader = "Create Vehicle";
                this.dialogText = "Fill in the following values and submit to add a new vehicle.";
                this.createVisible = true;
                console.log("Creating the vehicle-----------");
            },
            cancelConfirm: function(){
                this.showConfirm=false;
            },
            hideDialog: function() {
                this.dialogVisible = false;
                this.createVisible = false;

            }
        }
    }
</script>

<style scoped>

</style>