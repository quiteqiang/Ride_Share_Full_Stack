const { Model } = require("objection");


class Ride extends Model {
    static get tableName(){
        return 'ride';
    }
    static get relationMappings(){
        return{
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideId',
                        to: 'drivers.driverId'
                    },
                    to: 'driver.id'
                }
            },
            ride: {
                relation: Model.HasOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                }
            },
            from_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.fromLocationId',
                    to: 'location.id'
                }
            },
            to_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.toLocationId',
                    to: 'location.id'
                }
            }
        }
    }
}
module.exports = Ride;