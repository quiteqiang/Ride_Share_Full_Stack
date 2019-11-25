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