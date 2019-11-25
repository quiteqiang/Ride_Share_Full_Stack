class ride extends Model {
    static get tableName(){
        return 'ride';
    }
    static get relationMappings(){
        return{
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: driver,
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
                modelClass: vehicle,
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                }
            },
            from_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: location,
                join: {
                    from: 'ride.fromLocationId',
                    to: 'location.id'
                }
            },
            to_location:{
                relation: Model.BelongsToOneRelation,
                modelClass: location,
                join: {
                    from: 'ride.toLocationId',
                    to: 'location.id'
                }
            }
        }
    }
}