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
        console.log("I'm running!");
        const newRide = await ride.query().insert({
          date: request.payload.date,
          time: request.payload.time,
          distance: request.payload.distance,
          fuelPrice: request.payload.fuelPrice,
          fee: request.payload.fee,
          vehicleId: request.payload.vehicleId,
          fromLocationId: request.payload.fromLocationId,
          toLocationId: request.payload.toLocationId,
        });
        
        if (newRide){
          return {
            ok:true,
            msge: `Created ride from ${request.payload.fromLocationId}`
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
      handler: () => {
        return {
          Hello:"World"
        };
      }
    }
  ]);
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
