# COS-243 - Full-Stack Sample

Full-stack sample application, including:
* Vue UI
* Hapi RESTful API
* Objection/Knex data access layer
* PostgreSQL database

## Install Node packages

1. From the command line, run `yarn`

## Set Up Database

1. Update the Knex configuration in `hapi-server.js`
   with your database credentials.
2. Create the database tables by executing `models/create-schema.sql`
   (e.g., from a DataGrip console or the `psql` command line client).
3. Load sample data into the database by executing `models/insert-test-data.sql`

## Run Server

1. From a command prompt, execute `yarn api-watch`.
   This should start up the server.
   
## Run UI

1. From a different command prompt, execute `yarn ui-watch`.
   This should start the Vue development server.
2. Open your browser to one of the URLs 
   output by the Vue development server

## Routes


- A1 - Add and update a vehicle - vehicles/ID POST, PUT
- A2 - Add a vehicle type - vehicles/type/ID POST
- A3 - Add and update a ride (including location and state) - rides/ID POST, PUT
- A4 - Assign and update a vehicle for a ride - rides/rideID/vehicleID POST, DELETE
- A5 - Authorize a driver for a vehicle - rides/drivers/
- A6 - Get a report of all upcoming rides, including passenger(s) and driver(s) rides/ GET

- P1 - Sign up for Ride Share
- P2 - Sign up for a specific ride
- P3 - Get a report of all upcoming rides

- D1 - Sign up as a driver
- D2 - Elect to drive for a ride; a driver can only sign up to drive on rides that have a vehicle for which the driver is authorized.
- D3 - Get a report of all upcoming drives