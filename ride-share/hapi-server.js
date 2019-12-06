// Standard Node modules
const Path = require("path");

// Knex

const knex = require('knex')({
  client: 'pg',
  connection: {
  host: 'faraday.cse.taylor.edu',
  user: 'tim_swanson',
  password: 'wijenara',
  database: 'tim_swanson'
   }
});

// Objection
const objection = require("objection");
const Model = objection.Model; //Unknown if needed
objection.Model.knex(knex);

// Models
const driver = require("./models/Driver");
const vehicle = require("./models/Vehicle");
const ride = require("./models/Ride");
const state = require("./models/State");
const location = require("./models/Location");
const vehicle_type = require("./models/Vehicle_type");
const passenger = require("./models/Passenger");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true
  }
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true
    }
  });

  // Configure static file service.
  await server.register(require("@hapi/inert"));

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/rides",
      config: {
        description: "Create a ride",
      },
      handler: async (request,h) => {

        const newRide = await ride.query().insert({
          date: request.payload.date,
          time: request.payload.time,
          distance: request.payload.distance,
          fuelprice: request.payload.fuelprice,
          fee: request.payload.fee,
          vehicleid: request.payload.vehicleid,
          fromlocationid: request.payload.fromlocationid,
          tolocationid: request.payload.tolocationid,
        });

        if (newRide){
          return {
            ok:true,
            msge: `Created ride from ${request.payload.fromlocationid}`
          };
        }
        else {
          return {
            ok:false,
            msge: `Couldn't create ride`
          };
        }
      }
    },
    { 
      method: "GET",
      path: "/rides",
      config: {
        description: "Retrieve all rides"
      },
      handler: async (request, h) => {
        const data= await ride.query();
        return data;
      }
    },
    {
      method: "PUT",
      path:"/rides/{id}",
      config:{
        description: "Edit a ride"
      },
      handler: async (request, h)=>{
        const result = await ride.query().where('id',request.params.id).update(request.payload);
        if (result) {
          return {
            ok: true,
            msge: `Updated ride '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't update ride '${request.params.id}'`
          }
        }
      }
    },
    {
      method: "PUT",
      path:"/vehicles/{id}",
      config:{
        description: "Edit a vehicle"
      },
      handler: async (request, h)=>{//need to change
        const result = await vehicle.query().where('id',request.params.id).update(request.payload);
        if (result) {
          return {
            ok: true,
            msge: `Updated ride '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't update ride '${request.params.id}'`
          }
        }
      }
    },
    {
      method: "DELETE",
      path:"/rides/{id}",
      config:{
        description: "Delete a ride"
      },
      handler: async (request, h)=>{
        const result = await ride.query().deleteById(request.params.id);

        // const result = ride.query().delete().where("id",request.params.id);
        if (result) {
          return {
            ok: true,
            msge: `Deleted account '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't delete account '${request.params.id}'`
          }
        }
      }
    },
    {
      method: "DELETE",
      path:"/vehicles/{id}",
      config:{
        description: "Delete a ride"
      },
      handler: async (request, h)=>{
        const result = await vehicle.query().deleteById(request.params.id);///need to change

        // const result = ride.query().delete().where("id",request.params.id);
        if (result) {
          return {
            ok: true,
            msge: `Deleted account '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't delete account '${request.params.id}'`
          }
        }
      }
    },
    { 
      method: "GET",
      path: "/passengers",
      config: {
        description: "Retrieve all passengers"
      },
      handler: async (request, h) => {
        const data= await passenger.query();
        return data;
      }
    },
    {
      method: "POST",
      path: "/passengers",
      config: {
        description: "Create a passenger/Sign Up",
      },
      handler: async (request,h) => {
        const newdataRide = await passenger.query().insert(request.payload);
        
        if (newdataRide){
          return {
            ok:true,
            msge: `Created passenger  ${request.payload.firstName}`
          };
        }
        else {
          return {
            ok:false,
            msge: `Couldn't create passenger`
          };
        }
      }
    },
    {
      method: "POST",
      path: "/drivers",
      config: {
        description: "Create a driver/Sign Up as driver",
      },
      handler: async (request,h) => {
        const newdata = await driver.query().insert(request.payload);
        
        if (newdata){
          return {
            ok:true,
            msge: `Created driver  ${request.payload.firstName}`
          };
        }
        else {
          return {
            ok:false,
            msge: `Couldn't create driver`
          };
        }
      }
    },
    { 
      method: "GET",
      path: "/drivers",
      config: {
        description: "Retrieve all drivers"
      },
      handler: async (request, h) => {
        let drivers =  await driver.query();
        return drivers;
        
      }
    },
    {
      method: "GET",
      path: "/driversid",
      config: {
        description: "Retrieve all drivers id"
      },
      handler: async (request, h) => {
        let drivers =  await drivers.query();
        return drivers;

      }
    },
    { 
      method: "GET",
      path: "/vehicles",
      config: {
        description: "Retrieve all vehicles"
      },
      handler: async (request, h) => {
        const data= await vehicle.query();
        return data;
      }
    },
    
    {
      method: "GET",
      path: "/locations",
      config: {
        description: "Retrieve all locations"
      },
      handler: async (request, h) => {
        const data= await location.query();
        return data;
      }
    },
    {
      method: "POST",
      path:"/rides/{id}/drivers",
      config:{
        description: "Add a driver to a ride"
      },
      handler: async (request, h)=>{
        // const result = await ride.query().joinRelation('drivers').where('id',request.params.id);
        const singleRide = await ride.query().findById(request.params.id);
        const singleDriver = await driver.query().findById(request.payload.id);
        result = await singleRide.$relatedQuery('drivers').relate(singleDriver);


        if (result) {
          return {
            ok: true,
            msge: `Updated ride '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't update ride '${request.params.id}'`}
          }
        }
      },
      {
        method: "POST",
        path:"/rides/{id}/passengers",
        config:{
          description: "Add a passenger to a ride"
        },
        handler: async (request, h)=>{
          // const result = await ride.query().joinRelation('drivers').where('id',request.params.id);
          const singleRide = await ride.query().findById(request.params.id);
          const singlePassenger = await passenger.query().findById(request.payload.id);
          result = await singleRide.$relatedQuery('passengers').relate(singlePassenger);
  
  
          if (result) {
            return {
              ok: true,
              msge: `Updated ride '${request.params.id}'`
            };
          }
          else {
            return {
              ok : false,
              msge:  `Couldn't update ride '${request.params.id}'`}
            }
          }
        },
      {
        method: "POST",
        path:"/vehicles/{id}/drivers",
        config:{
          description: "Authorize a driver for a vehicle"
        },
        handler: async (request, h)=>{
          // const result = await ride.query().joinRelation('drivers').where('id',request.params.id);
          console.log("Drivers:");
          console.log(request.params.id + ", " + request.payload.id);

          const singleVehicle = await vehicle.query().findById(request.params.id);
          const singleDriver = await driver.query().findById(request.payload.id);
          result = await singleVehicle.$relatedQuery('drivers').relate(singleDriver);
          
  
          if (result) {
            return {
              ok: true,
              msge: `Authorized driver '${request.params.id}'`
            };
          }
          else {
            return {
              ok : false,
              msge:  `Couldn't authorize driver '${request.params.id}'`}
            }
          }
      },
      {
        method:"GET",
        path:""
      },
    {
      method: "PUT",
      path:"/vehicle/{id}",
      config:{
        description: "Edit a vehicle"
      },
      handler: async (request, h)=>{
        const result = await ride.query().where('id',request.params.id).update(request.payload);
        if (result) {
          return {
            ok: true,
            msge: `Updated vehicle '${request.params.id}'`
          };
        }
        else {
          return {
            ok : false,
            msge:  `Couldn't update vehicle '${request.params.id}'`
          }
        }
      }
    },
    {
      method: "POST",
      path: "/vehicles",
      config: {
        description: "Create a vehicle",
      },
      handler: async (request,h) => {

        const newVehicle = await vehicle.query().insert({
          make: request.payload.make,
          model: request.payload.model,
          color: request.payload.color,
          vehicletypeid: request.payload.vehicletypeid,
          capacity: request.payload.capacity,
          mpg: request.payload.mpg,
          licensestate: request.payload.licensestate,
          licensenumber: request.payload.licensenumber,
        });

        if (newVehicle){
          return {
            ok:true,
            msge: `Created vehicle model ${request.payload.model}`
          };
        }
        else {
          return {
            ok:false,
            msge: `Couldn't create vehicle`
          };
        }
      }
    },
    {
      method: "POST",
      path: "/vehicle_type",
      config: {
        description: "Create a vehicle_type",
      },
      handler: async (request,h) => {

        const newVehicleType = await vehicle_type.query().insert({
          type: request.payload.type,
        });

        if (newVehicleType){
          return {
            ok:true,
            msge: `Created vehicle model ${request.payload.model}`
          };
        }
        else {
          return {
            ok:false,
            msge: `Couldn't create vehicle`
          };
        }
      }
    },
    {
    method: "GET",
      path: "/vehicle_type",
      config: {
    description: "Retrieve all Vehicle Type"
  },
  handler: async (request, h) => {
    const data= await vehicle_type.query();
    return data;
  }
},
  ]);
  // server.route();
  //   {
  //     method: "POST",
  //     path: "/accounts",
  //     config: {
  //       description: "Sign up for an account",
  //       validate: {
  //         payload: Joi.object({
  //           firstName: Joi.string().required(),
  //           lastName: Joi.string().required(),
  //           email: Joi.string()
  //             .email()
  //             .required(),
  //           password: Joi.string().required()
  //         })
  //       }
  //     },
  //     handler: async (request, h) => {
  //       const existingAccount = await Account.query()
  //         .where("email", request.payload.email)
  //         .first();
  //       if (existingAccount) {
  //         return {
  //           ok: false,
  //           msge: `Account with email '${request.payload.email}' is already in use`
  //         };
  //       }

  //       const newAccount = await Account.query().insert({
  //         first_name: request.payload.firstName,
  //         last_name: request.payload.lastName,
  //         email: request.payload.email,
  //         password: request.payload.password
  //       });

  //       if (newAccount) {
  //         return {
  //           ok: true,
  //           msge: `Created account '${request.payload.email}'`
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           msge: `Couldn't create account with email '${request.payload.email}'`
  //         };
  //       }
  //     }
  //   },

  //   {
  //     method: "GET",
  //     path: "/accounts",
  //     config: {
  //       description: "Retrieve all accounts"
  //     },
  //     handler: (request, h) => {
  //       return Account.query();
  //     }
  //   },

  //   {
  //     method: "DELETE",
  //     path: "/accounts/{id}",
  //     config: {
  //       description: "Delete an account"
  //     },
  //     handler: (request, h) => {
  //       return Account.query()
  //         .deleteById(request.params.id)
  //         .then(rowsDeleted => {
  //           if (rowsDeleted === 1) {
  //             return {
  //               ok: true,
  //               msge: `Deleted account with ID '${request.params.id}'`
  //             };
  //           } else {
  //             return {
  //               ok: false,
  //               msge: `Couldn't delete account with ID '${request.params.id}'`
  //             };
  //           }
  //         });
  //     }
  //   }
  // ]);

  // Start the server.
  await server.start();
}

process.on("unhandledRejection", err => {
  server.logger().error(err);
  process.exit(1);
});

// Go!
init();
