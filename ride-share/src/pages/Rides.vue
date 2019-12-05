<template>
  <v-container>
    <div>
      <h4 class="display-1">Rides</h4>
      <v-btn color="primary" dark class="" v-on:click="createRide">New Item</v-btn>
      
      <v-btn color="" class="" v-on:click="update">Update</v-btn>
      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >

        <template v-slot:item.action="{ item }">
          <v-icon  small class="ml-2" @click="driveClicked(item)">
            mdi-seat
          </v-icon>
          <v-icon v-if="isDriver" small class="ml-2" @click="driveClicked(item)">
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
      <br>

      <div class="text-xs-center">
        <confirm
        :show=showConfirm
        :header=confirmHeader
        @confirm="confirmFunction"
        @cancel="cancelConfirm"
        ></confirm>

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
                <!-- <v-text-field
                  v-model="newRide.fromlocationid"
                  label="From Location"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.tolocationid"
                  label="To Location"
                  required
                ></v-text-field> -->
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
import Confirm from "../components/Confirm.vue";

export default {
  name: "SignUpPage",

  created(){
    this.update();
  },
  components:{
    "confirm":Confirm,
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
        { text: "Actions", value: "action" },
      ],

      editId: "",
      valid: false, // Are all the fields in the form valid?
      showConfirm: false,
      confirmHeader: "",

      newRide: {},

      // Was an account created successfully?
      accountCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogData: {0:"<no dialogData>"},
      dialogVisible: false,
      createVisible: false,
      dialogType: "",
      deletingRide: null,
      drivingRide: null,
      confirmFunction: this.drive,

      // Validation rules for the form fields. This functionality is an extension
      // that's part of the Vuetify package. Each rule is a list of functions
      // (note the fat arrows). Vuetify invokes all functions in the list,
      // passing it the content of the associated form field. Functions should
      // return either true (the field passes that validation) or a string
      // containing an error message indicating why the field doesn't pass validation.
      rules: {
        required: [val => val.length > 0 || "Required"],
        email: [val => /^\w+@\w+\.\w{2,}$/.test(val) || "Invalid e-mail"],
        password: [
          val => /[A-Z]/.test(val) || "Need upper case letter",
          val => /[a-z]/.test(val) || "Need lower case letter",
          val => /\d/.test(val) || "Need digit",
          val => val.length >= 8 || "Minimum 8 characters"
        ]
      }
    };
  },

  methods: {
    update: function(){
      this.$root.updateRides();  
      this.$root.updateVehicles();
      this.$root.updateLocations();
      this.$root.updateDrivers();

    },
    createRide: function(){
        console.log("111111");
        this.update();
        this.newRide = {};
        this.dialogType = "create";
        this.dialogHeader = "Create Ride";
        this.dialogText = "Fill in the following values and submit to create a new ride.";
        this.createVisible = true;
    },
    createRidePost: function() {
      console.log(this.newRide);
      this.$root.updateRides();
      this.hideDialog();


      // Haven't been successful yet.
      this.accountCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/rides", {
          date: this.newRide.date,
          time: this.newRide.time,
          distance: this.newRide.distance,
          fuelprice: this.newRide.fuelprice,
          fee: this.newRide.fee,
          vehicleid: this.newRide.vehicleid,
          fromlocationid: this.newRide.fromlocationid,
          tolocationid: this.newRide.tolocationid,
        })
        .then(result => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
        this.$root.updateRides();     
          if (result.status === 200) {
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.accountCreated = true;
              this.$root.rides.push(this.newRide)
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          }
        })
        .catch(err => this.showDialog("Failed", err));
    },
    editRide: function(ride){
        this.update();
        this.editId=ride.id;
        this.dialogType = "edit";
        this.dialogHeader = "Edit Ride";
        this.dialogText = "Change values and press submit to edit ride.";
        this.newRide = ride;
        this.createVisible = true;
    },
    editRideUpdate: function() {
      this.hideDialog();
      this.$axios
        .put("/rides/"+this.editId, {
          date: this.newRide.date,
          time: this.newRide.time,
          distance: this.newRide.distance,
          fuelprice: this.newRide.fuelprice,
          fee: this.newRide.fee,
          vehicleid: this.newRide.vehicleid,
          fromlocationid: this.newRide.fromlocationid,
          tolocationid: this.newRide.tolocationid,
        })
        .then(result => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
        this.$root.updateRides();     

          if (result.status === 200) {
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.update();
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          }
        })
        .catch(err => this.showDialog("Failed", err));
        this.editId = "";
    },
    deleteClicked: function(ride){
        this.deletingRide=ride;
        this.confirmHeader = "Delete ride?";
        this.confirmFunction = this.deleteRide;
        this.showConfirm=true;

    },
    deleteRide: function(){
        this.confirmHeader = "";
        this.showConfirm=false;
        let ride=this.deletingRide;
        this.$root.updateRides();
        this.$axios
        .delete("/rides/"+ride.id, ride)
        .then(result => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.status === 200) {
            if (result.data.ok) {
              this.update();
              this.showDialog("Success", result.data.msge);
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          }
        })
        .catch(err => this.showDialog("Failed", err));
    },
    showPrompt: function(){
    },
    // Helper method to display the dialog box with the appropriate content.
    showDialog: function(header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },

    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function() {
      this.dialogVisible = false;
      this.createVisible = false;

      if (this.accountCreated) {
        // Only navigate away from the sign-up page if we were successful.
        // this.$router.push({ name: "accounts" });
      }
    },
    cancelConfirm: function(){
      this.showConfirm=false;
    },
    driveClicked: function(ride){
        this.drivingRide=ride;
        this.confirmHeader = "Drive for this ride?";
        this.confirmFunction = this.drive;
        this.showConfirm=true;

    },
    drive: function(){
      this.showConfirm=false;
      this.confirmHeader="";
      let ride = this.drivingRide;

      this.$axios
      .post("/rides/" + ride.id + "/drivers",this.$root.currentUser)
      .then(result=>{
        console.log("Got result:",result);
      })
    }
  },

  computed: {
    rides: function() {
      if (this.$root.rides) {
        return this.$root.rides;
      } else {
        return false;
      }
    },
    vehicles: function(){
      return this.$root.vehicles;
    },
    locations: function(){
      return this.$root.locations;
    },
    currentUser: function() {
      if (this.$root.currentUser) {
        return this.$root.currentUser;
      } else {
        return false;
      }
    },
    isDriver: function(){
      let currentUser=this.$root.currentUser;
      
      if (!currentUser){
        return false;
      }
      let i = {};
      for (i of this.$root.drivers){
        if (currentUser.firstName==i.firstname && currentUser.lastName==i.lastname){
          return true;
        }
      }
      return false;
    }
  }
};
</script>
