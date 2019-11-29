const { Model } = require("objection");


class Vehicle_type extends Model {
    static get tableName(){
        return 'vehicle_type';
    }
    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: require('./Vehicle'),
                join: {
                    from: 'vehicle_type.id',
                    to: 'vehicle.vehicleTypeId'
                },
            }
        }
    }
}
module.exports = Vehicle_type;