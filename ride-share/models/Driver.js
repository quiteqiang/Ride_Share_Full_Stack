const { Model } = require("objection");

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }
    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Vehicle'),
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'authorization.driverId',
                        to: 'authorization.vehicleId'
                    },
                    to: 'vehicle.id'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Ride'),
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'drivers.driverId',
                        to: 'rideId'
                    },
                    to: 'ride.id'
                }
            }
        }
    }
}

module.exports = Driver;