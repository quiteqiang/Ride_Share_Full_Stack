const { Model } = require("objection");

class Drivers extends Model{
    static get tableName(){
        return "drivers";
    }
    static get relationMappings(){
        return{
            relation: this.ManyToManyRelation,
            modelClass:drive,
            join:{
                from:"drivers.driversid",
                to:"driver.id"
            }
        }
    }
}
module.exports = Drivers;