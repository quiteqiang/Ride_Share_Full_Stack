<template>
    <v-container>
        <div>
            <v-btn color="green" class="" v-on:click="addVehicleType">Add Vehicle Type</v-btn>
            <v-data-table
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:items="vehicle_type"
            >
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
                                        v-model='newVehicleType.type'
                                        label = "Type"
                                        required
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn v-if="dialogType=='create'" color="primary" dark class="mb-2" v-bind:disabled="!valid" v-on:click="addVehicleTypePost"
                            >Add Vehicle Type
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
        name: "Vehicle_type",
        components:{
            "confirm":Confirm,
        },
        created(){
            this.update();
        },
        data: function(){
            return{
                headers:[
                    {text:"Type", value: "type"},
                ],
                showConfirm: false,
                confirmHeader: "",
                confirmFunction: this.addVehicleType,
                newVehicleType:{},
                dialogHeader: "<no dialogHeader>",
                dialogText: "<no dialogText>",
                valid: false,
                createVisible: false,
                dialogType:"",
                accountCreated: false,
                dialogVisible:false,
            }
        },

        methods:{
            update:function(){
                this.$root.updateVehicleType();
            },
            cancelConfirm: function(){
                this.showConfirm=false;
            },
            addVehicleType: function(){
                console.log("Create VehicleType");
                this.newVehicleType = {};
                this.dialogType = "create";
                this.dialogHeader = "Add Vehicle Type";
                this.dialogText = "Fill in the following values and submit to add a new vehicle type.";
                this.createVisible = true;
                console.log("Creating the vehicle-----------");
            },
            addVehicleTypePost: function() {
                console.log(this.newVehicleType);
                this.$root.updateVehicleType();
                this.hideDialog();
                this.accountCreated = false;
                // Post the content of the form to the Hapi server.
                this.$axios
                    .post("/vehicle_type", {
                        type: this.newVehicleType.type,
                    })
                    .then(result => {
                        // Based on whether things worked or not, show the
                        // appropriate dialog.
                        this.$root.updateVehicleType();
                        if (result.status === 200) {
                            if (result.data.ok) {
                                this.showDialog("Success", result.data.msge);
                                this.accountCreated = true;
                                this.$root.vehicle_type.push(this.newVehicleType)
                            } else {
                                this.showDialog("Sorry", result.data.msge);
                            }
                        }
                    })
                    .catch(err => this.showDialog("Failed", err));
            },
            hideDialog: function() {
                this.dialogVisible = false;
                this.createVisible = false;
            },
            showDialog: function(header, text) {
                this.dialogHeader = header;
                this.dialogText = text;
                this.dialogVisible = true;
            },
        },
        computed:{
            vehicle_type: function(){
                return this.$root.vehicle_type;
            },
        }
    }
</script>

<style scoped>

</style>