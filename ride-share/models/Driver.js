class driver extends Model {
    static get tableName() {
        return 'driver';
    }
    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: vehicle,
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
                modelClass: ride,
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