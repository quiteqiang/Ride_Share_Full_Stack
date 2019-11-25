
const knex = require('knex')({
    client: 'pg',
    connection: {
    host: 'faraday.cse.taylor.edu',
    user: 'tim_swanson',
    password: 'wijenara',
    database: 'tim_swanson'
     }
 });

 const objection = require('objection');
 const Model = objection.Model;
Model.knex(knex);

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
class vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: driver,
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
                modelClass: vehicle_type,
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicle_type.id'
                }
            },

            rides: {
                relation: Model.HasManyRelation,
                modelClass: ride,
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'
                }
            }

        }
    }
}

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
class state extends Model {
    static get tableName() {
        return 'state';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: state,
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            }
        }
    }
}

class location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings(){
        return {
            state: {
                relation: Model.ManyToManyRelation,
                modelClass: location,
                join: {
                    from: 'location.state',
                    to: 'state.abbreviation'
                }
            },
            ride_depart:{
                relation: Model.HasManyRelation,
                modelClass: ride,
                join:{
                    from:'location.id',
                    to:'ride.fromLocationId'
                }
            },
            ride_leave:{
                relation: Model.HasManyRelation,
                modelClass: ride,
                join:{
                    from:'location.id',
                    to:'ride.toLocationId'
                }
            }
        }
    }
}

class vehicle_type extends Model {
    static get tableName(){
        return 'vehicle_type';
    }
    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: vehicle,
                join: {
                    from: 'vehicle_type.id',
                    to: 'vehicle.vehicleTypeId'
                },
            }
        }
    }
}

class passenger extends Model {
    static get tableName(){
        return 'passenger';
    }
    static get relationMappings(){
        return {
            rides: {
                relation: this.ManyToManyRelation,
                modelClass: ride,
                join: {
                    from: 'passenger.id',
                    through: {
                        from: 'passengers.passengerId',
                        to: 'passengers.rideId'
                    },
                    to: 'ride.id'
                }
            }
        }
    }
}
driver.query()
    .then(result => {
        console.log(result);
    })
    ;
// vehicle.query()
//     .then(vehicle => {
//         console.log(vehicle[0]);
//     })
//     .catch((err)=>{
//         console.log(err);
//         throw err;
//     })
//     .finally(()=>{
//         knex.destroy();
//     });
//
// driver.query()
//     .then(driver => {
//         console.log(driver[0]);
//     })
//     .catch((err)=>{
//         console.log(err);
//         throw err;
//     })
//     .finally(()=>{
//         knex.destroy();
//     });

location.query()
    .then(location => {
        console.log(location[0]);
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })
    .finally(()=>{
        knex.destroy();
    });
driver.query()
    .then(state => {
        console.log(state[0]);
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })
    .finally(()=>{
        knex.destroy();
    })
