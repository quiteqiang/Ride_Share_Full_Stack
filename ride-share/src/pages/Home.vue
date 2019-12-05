<template>
  <v-container>
    <div>
      <h4 class="display-1">Welcome to TQ ride share!</h4>

      <p class="body-1">Sign in to view your rides</p>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteAccount(item)">
            mdi-delete
          </v-icon>
          <v-icon small class="ml-2" @click="updateAccount(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
export default {
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
          { text: "From", value: "fromLocationId" },
          { text: "To", value: "toLocationId" },
          { text: "Departure Time", value: "time" },
          { text: "Vehicle", value: "vehicleId" },
        ],
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

}
</script>
