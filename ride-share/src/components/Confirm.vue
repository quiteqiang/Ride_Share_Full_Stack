<template>
    <v-dialog v-model="show" width="300">
          <v-card>
            <v-card-title primary-title>
              {{header}}
            </v-card-title>

            <v-card-text>
              Click ok to confirm.
            </v-card-text>

            <v-divider></v-divider>
            


      <v-card-actions>
          <v-btn color="primary" dark class="mb-2"  v-on:click="confirm">
            Ok
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text v-on:click="cancel">Cancel</v-btn>
      </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
export default {
    name:"Confirm",
    props: ["show","header"],
    methods:{
    confirm() {
        this.$emit("confirm");
    },
    cancel() {
        this.$emit("cancel");
    }
    },
};
</script>
