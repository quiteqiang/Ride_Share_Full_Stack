<template>
    <div>
    <Vehicle></Vehicle>
    <Vehicle_T></Vehicle_T>
    </div>
<!--    <v-container>-->
<!--        <div>-->
<!--            <h4 class="display-1">Administrator</h4>-->
<!--            <v-btn color="primary" class="" v-on:click="createVehicle">New Vehicle</v-btn>-->
<!--            <v-btn color="primary" class="" v-on:click="update">Update Vehicle</v-btn>-->
<!--            <v-btn color="" class="" v-on:click="createRide">New Ride</v-btn>-->
<!--            <v-btn color="green" class="" v-on:click="addVehicleType">Add Vehicle Type</v-btn>-->
<!--            <v-data-table-->
<!--                    class="elevation-1"-->
<!--                    v-bind:headers="headers"-->
<!--                    v-bind:items="vehicles"-->
<!--            >-->

<!--                <template v-slot:item.action="{ item }">-->
<!--&lt;!&ndash;                    <v-icon small class="ml-2" @click="driveClicked(item)">&ndash;&gt;-->
<!--&lt;!&ndash;                        mdi-seat&ndash;&gt;-->
<!--&lt;!&ndash;                    </v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;                    <v-icon small class="ml-2" @click="driveClicked(item)">&ndash;&gt;-->
<!--&lt;!&ndash;                        mdi-steering&ndash;&gt;-->
<!--&lt;!&ndash;                    </v-icon>&ndash;&gt;-->
<!--                    <v-icon small class="ml-2" @click="editVehicle(item)">-->
<!--                        mdi-pencil-->
<!--                    </v-icon>-->
<!--                    <v-icon small @click="deleteClicked(item)">-->
<!--                        mdi-delete-->
<!--                    </v-icon>-->
<!--                </template>-->
<!--                <template v-slot:item.change="{ item }">-->
<!--                    <v-icon small class="ml-2" @click="editRide(item)">-->
<!--                        mdi-pencil-->
<!--                    </v-icon>-->
<!--                    <v-icon small @click="deleteClicked(item)">-->
<!--                        mdi-delete-->
<!--                    </v-icon>-->
<!--                </template>-->
<!--            </v-data-table>-->
<!--            <div class=" text-xs-center">-->
<!--                <confirm-->
<!--                        :show=showConfirm-->
<!--                        :header=confirmHeader-->
<!--                        @confirm="confirmFunction"-->
<!--                        @cancel="cancelConfirm"-->
<!--                ></confirm>-->

<!--                <v-dialog v-model="createVisible" width="500">-->
<!--                    <v-card>-->
<!--                        <v-card-title>-->
<!--                            {{this.dialogHeader}}-->
<!--                        </v-card-title>-->
<!--                        <v-card-text>-->
<!--                            {{this.dialogText}}-->
<!--                            {{this.valid}}-->
<!--                        </v-card-text>-->
<!--                        <v-divider></v-divider>-->
<!--                        <v-card-text>-->
<!--                            <v-form v-model="valid">-->
<!--                                <v-text-field-->
<!--                                    v-model='newVehicle.make'-->
<!--                                    label = "Make"-->
<!--                                    required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.model"-->
<!--                                        label = "Model"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.color"-->
<!--                                        label = "Color"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.vehicletypeid"-->
<!--                                        label = "V_typeid"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.capacity"-->
<!--                                        label = "Capacity"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.mpg"-->
<!--                                        label = "Mpg"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.licenseState"-->
<!--                                        label = "License State"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.licensenumber"-->
<!--                                        label = "License Number"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                            </v-form>-->

<!--                        </v-card-text>-->
<!--                        <v-card-actions>-->
<!--                            <v-btn v-if="dialogType=='create'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="addVehiclePost"-->
<!--                            >Add Vehicle-->
<!--                            </v-btn>-->
<!--                            <v-btn v-if="dialogType=='edit'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="editRideUpdate">-->
<!--                                Edit Ride-->
<!--                            </v-btn>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn color="primary" text v-on:click="hideDialog">Cancel</v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->
<!--                </v-dialog >-->
<!--                <v-dialog v-model="createVisible1" width="500">-->
<!--                    <v-card>-->
<!--                        <v-card-title>-->
<!--                            {{this.dialogHeader}}-->
<!--                        </v-card-title>-->
<!--                        <v-card-text>-->
<!--                            {{this.dialogText}}-->
<!--                            {{this.valid}}-->
<!--                        </v-card-text>-->
<!--                        <v-divider></v-divider>-->
<!--                        <v-card-text>-->
<!--                            <v-form v-model="valid">-->
<!--                                <v-text-field-->
<!--                                        v-model='newRide.date'-->
<!--                                        label = "Date"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newRide.time"-->
<!--                                        label = "Time"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.distance"-->
<!--                                        label = "Distance"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.fuelprice"-->
<!--                                        label = "Fuelprice"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.vehicleid"-->
<!--                                        label = "VehicleId"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.fromlocationid"-->
<!--                                        label = "FromlocationId"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                                <v-text-field-->
<!--                                        v-model="newVehicle.tolocationid"-->
<!--                                        label = "TolocationId"-->
<!--                                        required-->
<!--                                >-->
<!--                                </v-text-field>-->
<!--                            </v-form>-->
<!--                        </v-card-text>-->
<!--                        <v-card-actions>-->
<!--                            <v-btn v-if="dialogType=='create'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="createRidePost"-->
<!--                            >Create Ride-->
<!--                            </v-btn>-->
<!--                            <v-btn v-if="dialogType=='edit'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="editRideUpdate">-->
<!--                                Edit Ride-->
<!--                            </v-btn>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn color="primary" text v-on:click="hideDialog1">Cancel</v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->
<!--                </v-dialog>-->

<!--            </div>-->
<!--            </div>-->
<!--    </v-container>-->
</template>

<script>
//import Confirm from "../components/Confirm.vue";
 import Vehicle from "../components/Vehicle.vue";
 // import Ride from "../components/Ride.vue";
import Vehicle_t from "../components/Vehicle_type.vue";

export default {
        name: "Admin",
        // created(){
        //     this.update();
        // },
        components:{
            //"confirm":Confirm,
            "Vehicle":Vehicle,
            // "Ride":Ride,
            "Vehicle_T":Vehicle_t,
        },
    //     data: function(){
    //         return {
    //             headers:[
    //                 {text:"Make", value: "make"},
    //                 {text:"Model", value: "model"},
    //                 {text:"Color",value:"color"},
    //                 {text:"Capacity",value:"capacity"},
    //                 {text:"Mpg",value:"mpg"},
    //                 {text:"License State",value:"licensestate"},
    //                 {text:"License Number",value:"licensenumber"},
    //                 {text: "Actions", value: "action" },
    //                 {text: "Date", value: "fromlocationid" },
    //                 {text: "Time", value: "tolocationid" },
    //                 {text: "Distance", value: "distance" },
    //                 {text: "Fuelprice", value: "fuelprice" },
    //                 {text: "Vehicleid", value: "vehicleid" },
    //                 {text: "Fromlocationid", value: "fromlocationid" },
    //                 {text: "Tolocationid", value: "tolocationid" },
    //                 {text: "Change", value: "change" }
    //             ],
    //
    //             newVehicle:{},
    //             newRide:{},
    //
    //             // displayed data by dialog
    //             dialogHeader: "<no dialogHeader>",
    //             dialogText: "<no dialogText>",
    //             dialogData: {0:"<no dialogData>"},
    //             dialogVisible: false,
    //             dialogVisible1: false,
    //             createVisible: false,
    //             createVisible1: false,
    //             dialogType:"",
    //
    //             showConfirm: false,
    //             confirmHeader: "",
    //             confirmFunction: this.addVehicle,
    //
    //             valid: false,
    //             editId: "",
    //             accountCreated: false
    //         }
    //     },
    // methods:{
    //     update:function(){
    //         this.$root.updateRides();
    //         this.$root.updateVehicles();
    //         this.$root.updateLocations();
    //     },
    //     createVehicle: function(){
    //         console.log("Create Vehicle");
    //         //this.update();
    //         this.newVehicle = {};
    //         this.dialogType = "create";
    //         this.dialogHeader = "Add Vehicle";
    //         this.dialogText = "Fill in the following values and submit to add a new vehicle.";
    //         this.createVisible = true;
    //         console.log("Creating the vehicle-----------");
    //     },
    //     createRide: function(){
    //         console.log("111111");
    //         this.update();
    //         this.newRide = {};
    //         this.dialogType = "create";
    //         this.dialogHeader = "Create Ride";
    //         this.dialogText = "Fill in the following values and submit to create a new ride.";
    //         this.createVisible1 = true;
    //     },
    //     addVehiclePost: function() {
    //         console.log(this.newVehicle);
    //         this.$root.updateVehicles();
    //         this.hideDialog();
    //         this.accountCreated = false;
    //         // Post the content of the form to the Hapi server.
    //         this.$axios
    //             .post("/vehicles", {
    //                 make: this.newVehicle.make,
    //                 model: this.newVehicle.model,
    //                 color: this.newVehicle.color,
    //                 vehicletypeid: this.newVehicle.vehicletypeid,
    //                 capacity: this.newVehicle.capacity,
    //                 mpg: this.newVehicle.mpg,
    //                 licensestate: this.newVehicle.licensestate,
    //                 licensenumber: this.newVehicle.licensenumber,
    //             })
    //             .then(result => {
    //                 // Based on whether things worked or not, show the
    //                 // appropriate dialog.
    //                 this.$root.updateVehicles();
    //                 if (result.status === 200) {
    //                     if (result.data.ok) {
    //                         this.showDialog("Success", result.data.msge);
    //                         this.accountCreated = true;
    //                         this.$root.vehicles.push(this.newVehicle)
    //                     } else {
    //                         this.showDialog("Sorry", result.data.msge);
    //                     }
    //                 }
    //             })
    //             .catch(err => this.showDialog("Failed", err));
    //     },
    //     createRidePost: function() {
    //         console.log(this.newRide);
    //         this.$root.updateRides();
    //         this.hideDialog1();
    //         // Haven't been successful yet.
    //         this.accountCreated = false;
    //
    //         // Post the content of the form to the Hapi server.
    //         this.$axios
    //             .post("/rides", {
    //                 date: this.newRide.date,
    //                 time: this.newRide.time,
    //                 distance: this.newRide.distance,
    //                 fuelprice: this.newRide.fuelprice,
    //                 fee: this.newRide.fee,
    //                 vehicleid: this.newRide.vehicleid,
    //                 fromlocationid: this.newRide.fromlocationid,
    //                 tolocationid: this.newRide.tolocationid,
    //             })
    //             .then(result => {
    //                 // Based on whether things worked or not, show the
    //                 // appropriate dialog.
    //                 this.$root.updateRides();
    //                 if (result.status === 200) {
    //                     if (result.data.ok) {
    //                         this.showDialog1("Success", result.data.msge);
    //                         this.accountCreated = true;
    //                         this.$root.rides.push(this.newRide)
    //                     } else {
    //                         this.showDialog1("Sorry", result.data.msge);
    //                     }
    //                 }
    //             })
    //             .catch(err => this.showDialog1("Failed", err));
    //     },
    //     cancelConfirm: function(){
    //         this.showConfirm=false;
    //     },
    //     hideDialog: function() {
    //         this.dialogVisible = false;
    //         this.createVisible = false;
    //     },
    //     hideDialog1: function() {
    //         // this.dialogVisible1 = false;
    //         this.createVisible1 = false;
    //     },
    //     editVehicle: function(vehicle){
    //         this.update();
    //         this.editId=vehicle.id;
    //         this.dialogType = "edit";
    //         this.dialogHeader = "Edit Vehicle"
    //         this.dialogText = "Change values and press submit to edit ride."
    //         this.newVehicle = vehicle;
    //         this.createVisible = true;
    //     },
    //     deleteClicked: function(vehicle){
    //         console.log("Confirming...");
    //         this.deletingRide=vehicle;
    //         this.confirmHeader = "Delete vehicle?";
    //         this.confirmFunction = this.deleteVehicle;
    //         this.showConfirm=true;
    //     },
    //     deleteVehicle: function(){
    //         this.confirmHeader = "";
    //         this.showConfirm=false;
    //         let vehicle=this.deletingRide;
    //         console.log("Delete Ride");
    //         console.log(vehicle);
    //         this.$root.updateRides();
    //         this.$axios
    //             .delete("/vehicles/"+vehicle.id, vehicle)
    //             .then(result => {
    //                 // Based on whether things worked or not, show the
    //                 // appropriate dialog.
    //                 if (result.status === 200) {
    //                     if (result.data.ok) {
    //                         console.log("Success");
    //                         console.log(result.data);
    //                         this.update();
    //                         this.showDialog("Success", result.data.msge);
    //                     } else {
    //                         this.showDialog("Sorry", result.data.msge);
    //                     }
    //                 }
    //             })
    //             .catch(err => this.showDialog("Failed", err));
    //     },
    //     showDialog: function(header, text) {
    //         this.dialogHeader = header;
    //         this.dialogText = text;
    //         this.dialogVisible = true;
    //     },
    //     showDialog1: function(header, text) {
    //         this.dialogHeader = header;
    //         this.dialogText = text;
    //         this.dialogVisible1 = true;
    //     }
    // },
    // computed: {
    //     vehicles: function(){
    //         return this.$root.vehicles;
    //     },
    //     rides: function() {
    //         if (this.$root.rides) {
    //             return this.$root.rides;
    //         } else {
    //             return false;
    //         }
    //     },
    //     locations: function(){
    //         return this.$root.locations;
    //     },
    // }
};
</script>
<style scoped>
</style>