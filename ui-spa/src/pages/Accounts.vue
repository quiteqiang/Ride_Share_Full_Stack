<template>
  <v-container>
    <div>
      <h4 class="display-1">Accounts</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="accounts"
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

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Accounts",

  data: function() {
    return {
      headers: [
        { text: "Email", value: "email" },
        { text: "First", value: "firstName" },
        { text: "Last", value: "lastName" },
        { text: "Action", value: "action" }
      ],
      accounts: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/accounts").then(response => {
      this.accounts = response.data.map(account => ({
        id: account.id,
        email: account.email,
        firstName: account.first_name,
        lastName: account.last_name
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Update account information.
    updateAccount(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an account.
    deleteAccount(item) {
      this.$axios.delete(`/accounts/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local account
          // by filtering the deleted account from the list of accounts.
          this.accounts = this.accounts.filter(
            account => account.id !== item.id
          );
        }
      });
    }
  }
};
</script>
