<template>
  <v-container>
    <div>
      <h4 class="display-1">Add Ride</h4>

      <instructions details="Fill out the information to make a ride!" />

      <v-form v-model="valid">
        <v-text-field
          v-model="newMember.date"
          label="Date"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.time"
          label="Time"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.distance"
          label="Ride Distance"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="newMember.fuelPrice"
          label="Fuel Price"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.fee"
          label="Ride Fee"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.vehicleId"
          label="Vehicle ID"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.fromLocationId"
          label="From Location"
          required
        ></v-text-field>
        <v-text-field
          v-model="newMember.toLocationId"
          label="To Location"
          required
        ></v-text-field>
        
        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
          >Sign Up
        </v-btn>
      </v-form>

      <div class="text-xs-center">
        <v-dialog v-model="dialogVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogHeader }}
            </v-card-title>

            <v-card-text>
              {{ dialogText }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import Instructions from "../components/Instructions.vue";

export default {
  name: "SignUpPage",
  components: {
    Instructions // Use the Instructions component we just imported
  },
  data: function() {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect account data
      newMember: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },

      // Was an account created successfully?
      accountCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,

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
    handleSubmit: function() {
      console.log(this.newMember);
      // Haven't been successful yet.
      this.accountCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/rides", {
          date: this.newMember.date,
          time: this.newMember.time,
          distance: this.newMember.distance,
          fuelPrice: this.newMember.fuelPrice,
          fee: this.newMember.fee,
          vehicleId: this.newMember.vehicleId,
          fromLocationId: this.newMember.fromLocationId,
          toLocationId: this.newMember.toLocationId,
        })
        .then(result => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.status === 200) {
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.accountCreated = true;
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
      if (this.accountCreated) {
        // Only navigate away from the sign-up page if we were successful.
        this.$router.push({ name: "accounts" });
      }
    }
  }
};
</script>
