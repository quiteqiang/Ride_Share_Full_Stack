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