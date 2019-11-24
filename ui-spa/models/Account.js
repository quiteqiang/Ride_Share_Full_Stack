const { Model } = require("objection");

class Account extends Model {
  static get tableName() {
    return "account";
  }
}

module.exports = Account;
