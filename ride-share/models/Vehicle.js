const { Model } = require("objection");

class Vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorization.vehicle_id',
                        to: 'authorization.driver_id'
                    },
                    to: 'driver.id'
                }
            },
            vehicle_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle_type,
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicle_type.id'
                }
            },

            rides: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'
                }
            }

        }
    }
}
module.exports = Vehicle;