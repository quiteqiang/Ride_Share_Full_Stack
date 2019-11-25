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