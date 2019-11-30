<template>
  <v-container>
    <div>
      <h4 class="display-1">Rides</h4>
      <!-- <p>{{this.$root.rides}}</p> -->
      <v-btn color="primary" dark class="mb-2" v-on:click="createRide">New Item</v-btn>
      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >
      
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteRide(item)">
            mdi-delete
          </v-icon>
          <v-icon small class="ml-2" @click="editRide(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
      <br>
      
      

      <div class="text-xs-center">
        <v-dialog v-model="createVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              Create New Ride
            </v-card-title>

            <v-card-text>
              Fill out the form to create a new ride!
              {{this.newRide}}
              {{this.valid}}
            </v-card-text>

            <v-divider></v-divider>
             <v-form v-model="valid">
               <v-text-field
                  v-model="newRide.id"
                  label="ID"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.date"
                  label="Date"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.time"
                  label="Time"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.distance"
                  label="Ride Distance"
                  required
                >
                </v-text-field>
                <v-text-field
                  v-model="newRide.fuelPrice"
                  label="Fuel Price"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.fee"
                  label="Ride Fee"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.vehicleId"
                  label="Vehicle ID"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.fromLocationId"
                  label="From Location"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newRide.toLocationId"
                  label="To Location"
                  required
                ></v-text-field>
        
        
      </v-form>
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
  name: "SignUpPage",
  data: function() {
    // date: "1/1/1",
    //   time: "1:00:00",
    //   distance: 5,
    //   fuelPrice: 5,
    //   fee: 5,
    //   vehicleId: 4,
    //   fromLocationId: 5,
    //   toLocationId: 6,
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "From", value: "fromLocationId" },
        { text: "To", value: "toLocationId" },
        { text: "Departure Time", value: "time" },
        { text: "Vehicle", value: "vehicleId" },
        { text: "Actions", value: "action" },

      ],

      valid: false, // Are all the fields in the form valid?

      // Object to collect account data
      newRide: {
      id: "",
      date: "",
      time: "",
      distance: null,
      fuelPrice: null,
      fee: null,
      vehicleId: null,
      fromLocationId: null,
      toLocationId: null,
      },

      // Was an account created successfully?
      accountCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogData: {0:"<no dialogData>"},
      dialogVisible: false,
      createVisible: false,
      dialogType: "",

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
    // Invoked when the user clicks the 'Sign Up' button.
    editRide: function(ride){
        console.log("Edit Ride");
        this.dialogType = "edit";
        this.createVisible = true;
        this.newRide = ride;
        console.log(ride);
    },
    deleteRide: function(ride){
        console.log("Delete Ride");
        console.log(ride);
        this.$root.updateRides();
        this.$axios
        .delete("/rides", ride)
        .then(result => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.status === 200) {
            if (result.data.ok) {
              this.$root.updateRides();
              this.showDialog("Success", result.data.msge);
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          }
        })
        .catch(err => this.showDialog("Failed", err));
    },
    createRide: function(){
        console.log("Create Ride");
        this.newRide = {};
        this.dialogType = "create";
        this.createVisible = true;
        
    },
    showPrompt: function(){
        console.log("Show Prompt");
    },
    createRidePost: function() {
      console.log(this.newRide);
      // this.$root.rides.push(this.newRide);
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
          fuelPrice: this.newRide.fuelPrice,
          fee: this.newRide.fee,
          vehicleId: this.newRide.vehicleId,
          fromLocationId: this.newRide.fromLocationId,
          toLocationId: this.newRide.toLocationId,
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
    editRideUpdate: function() {
      this.hideDialog();
      console.log(this.newRide);
      // let i=0
      // for( i in this.$root.rides ){
      //   if (i.id==this.newRide.id){
      //     break;
      //   }
      // }
      // this.$root.rides[i]=this.newRide;

      // console.log(this.$root.rides.find(i => i.id==this.newRide.id));
      

      // Haven't been successful yet.
      this.accountCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/rides", {
          date: this.newRide.date,
          time: this.newRide.time,
          distance: this.newRide.distance,
          fuelPrice: this.newRide.fuelPrice,
          fee: this.newRide.fee,
          vehicleId: this.newRide.vehicleId,
          fromLocationId: this.newRide.fromLocationId,
          toLocationId: this.newRide.toLocationId,
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
        this.$router.push({ name: "accounts" });
      }
    }
  },
  computed: {
    rides: function() {
      if (this.$root.rides) {
        return this.$root.rides;
      } else {
        return false;
      }
    }
  }
};
</script>
