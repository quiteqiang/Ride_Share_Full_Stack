<template>
    <v-container>
        <div>
            <h4 class="display-1">Administrator</h4>
            <v-btn color="" class="" v-on:click="createVehicle">New Vehicle</v-btn>

            <v-btn color="primary" class="" v-on:click="update">Update Vehicle</v-btn>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="vehicles"
            >

                <template v-slot:item.action="{ item }">
<!--                    <v-icon small class="ml-2" @click="driveClicked(item)">-->
<!--                        mdi-seat-->
<!--                    </v-icon>-->
<!--                    <v-icon small class="ml-2" @click="driveClicked(item)">-->
<!--                        mdi-steering-->
<!--                    </v-icon>-->
                    <v-icon small class="ml-2" @click="editVehicle(item)">
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
                                    v-model='newVehicle.make'
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
                            >Add Vehicle
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
import Confirm from "../components/Confirm.vue";
export default {
        name: "Admin",
        created(){
            this.update();
        },
        components:{
            "confirm":Confirm,
        },
        data: function(){
            return {
                headers:[
                    {text:"Make", value: "make"},
                    {text:"Model", value: "model"},
                    {text:"Color",value:"color"},
                    {text:"Capacity",value:"capacity"},
                    {text:"Mpg",value:"mpg"},
                    {text:"License State",value:"licensestate"},
                    {text:"License Number",value:"licensenumber"},
                    { text: "Actions", value: "action" }
                ],

                newVehicle:{},

                // displayed data by dialog
                dialogHeader: "<no dialogHeader>",
                dialogText: "<no dialogText>",
                dialogData: {0:"<no dialogData>"},
                dialogVisible: false,
                createVisible: false,
                dialogType:"",

                showConfirm: false,
                confirmHeader: "",
                confirmFunction: this.addVehicle,

                valid: false,
                editId: "",
                accountCreated: false
            }
        },
    methods:{
        update:function(){
            this.$root.updateRides();
            this.$root.updateVehicles();
            this.$root.updateLocations();
        },
        createVehicle: function(){
            console.log("Create Vehicle");
            //this.update();
            this.newVehicle = {};
            this.dialogType = "create";
            this.dialogHeader = "Add Vehicle";
            this.dialogText = "Fill in the following values and submit to add a new vehicle.";
            this.createVisible = true;
            console.log("Creating the vehicle-----------");
        },
        addVehiclePost: function() {
            console.log(this.newVehicle);
            this.$root.updateVehicles();
            this.hideDialog();
            this.accountCreated = false;
            // Post the content of the form to the Hapi server.
            this.$axios
                .post("/vehicles", {
                    //make: this.newVehicle[".make"],
                    model: this.newVehicle.model,
                    color: this.newVehicle.color,
                    vehicletypeid: this.newVehicle.vehicletypeid,
                    capacity: this.newVehicle.capacity,
                    mpg: this.newVehicle.mpg,
                    licensestate: this.newVehicle.licensestate,
                    licensenumber: this.newVehicle.licensenumber,
                })
                .then(result => {
                    // Based on whether things worked or not, show the
                    // appropriate dialog.
                    this.$root.updateVehicles();
                    if (result.status === 200) {
                        if (result.data.ok) {
                            this.showDialog("Success", result.data.msge);
                            this.accountCreated = true;
                            this.$root.vehicles.push(this.newVehicle)
                        } else {
                            this.showDialog("Sorry", result.data.msge);
                        }
                    }
                })
                .catch(err => this.showDialog("Failed", err));
        },
        cancelConfirm: function(){
            this.showConfirm=false;
        },
        hideDialog: function() {
            this.dialogVisible = false;
            this.createVisible = false;
        },
        editVehicle: function(vehicle){
            this.update();
            this.editId=vehicle.id;
            this.dialogType = "edit";
            this.dialogHeader = "Edit Vehicle"
            this.dialogText = "Change values and press submit to edit ride."
            this.newVehicle = vehicle;
            this.createVisible = true;
        },
        deleteClicked: function(vehicle){
            console.log("Confirming...");
            this.deletingRide=vehicle;
            this.confirmHeader = "Delete vehicle?";
            this.confirmFunction = this.deleteVehicle;
            this.showConfirm=true;
        },
        deleteVehicle: function(){
            this.confirmHeader = "";
            this.showConfirm=false;
            let vehicle=this.deletingRide;
            console.log("Delete Ride");
            console.log(vehicle);
            this.$root.updateRides();
            this.$axios
                .delete("/vehicles/"+vehicle.id, vehicle)
                .then(result => {
                    // Based on whether things worked or not, show the
                    // appropriate dialog.
                    if (result.status === 200) {
                        if (result.data.ok) {
                            console.log("Success");
                            console.log(result.data);
                            this.update();
                            this.showDialog("Success", result.data.msge);
                        } else {
                            this.showDialog("Sorry", result.data.msge);
                        }
                    }
                })
                .catch(err => this.showDialog("Failed", err));
        },
        showDialog: function(header, text) {
            this.dialogHeader = header;
            this.dialogText = text;
            this.dialogVisible = true;
        }
    },
    computed: {
        vehicles: function(){
            return this.$root.vehicles;
        },
        rides: function() {
            if (this.$root.rides) {
                return this.$root.rides;
            } else {
                return false;
            }
        },
        locations: function(){
            return this.$root.locations;
        },
    }
};
</script>
<style scoped>
</style>