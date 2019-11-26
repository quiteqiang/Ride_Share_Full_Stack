const { Model } = require("objection");


class Location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings(){
        return {
            state: {
                relation: Model.ManyToManyRelation,
                modelClass: Location,
                join: {
                    from: 'location.state',
                    to: 'state.abbreviation'
                }
            },
            ride_depart:{
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join:{
                    from:'location.id',
                    to:'ride.fromLocationId'
                }
            },
            ride_leave:{
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join:{
                    from:'location.id',
                    to:'ride.toLocationId'
                }
            }
        }
    }
}
module.exports = Location;