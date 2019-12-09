const { Model } = require("objection");


class Ride extends Model {
    static get tableName(){
        return 'ride';
    }
    static get relationMappings(){
        return{
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Driver'),
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideid',
                        to: 'drivers.driverid'
                    },
                    to: 'driver.id'
                }
            },
            passengers: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Passenger'),
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'passengers.rideid',
                        to: 'passengers.passengerid'
                    },
                    to: 'passenger.id'
                }
            },
            vehicle: {
                relation: Model.HasOneRelation,
                modelClass: require('./Vehicle'),
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                }
            },
            from_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Location'),
                join: {
                    from: 'ride.fromlocationid',
                    to: 'location.id'
                }
            },
            to_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Location'),
                join: {
                    from: 'ride.tolocationid',
                    to: 'location.id'
                }
            }
        }
    }
}
module.exports = Ride;