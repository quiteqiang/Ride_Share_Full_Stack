const { Model } = require("objection");


class Passenger extends Model {
    static get tableName(){
        return 'passenger';
    }
    static get relationMappings(){
        return {
            rides: {
                relation: this.ManyToManyRelation,
                modelClass: require('./Ride'),
                join: {
                    from: 'passenger.id',
                    through: {
                        from: "passengers.passengerId",
                        to: "passengers.rideId"
                    },   //TODO Figure this out
                    to:'ride.id'
                }

            }
        }
    }
}
module.exports = Passenger;