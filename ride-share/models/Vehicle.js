const { Model } = require("objection");

class Vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Driver'),
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorization.vehicleId',
                        to: 'authorization.driverId'
                    },
                    to: 'driver.id'
                }
            },
            vehicle_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Vehicle_type'),
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicle_type.id'
                }
            },

            rides: {
                relation: Model.HasManyRelation,
                modelClass: require('./Ride'),
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'
                }
            }

        }
    }
}
module.exports = Vehicle;