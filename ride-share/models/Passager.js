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
                        from: passengers.passengerId,
                        to: rideId
                    }
                }

            }
        }
    }
}