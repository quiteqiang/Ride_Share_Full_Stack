const { Model } = require("objection");


class State extends Model {
    static get tableName() {
        return 'state';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./State'),
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            }
        }
    }
}
module.exports = State;