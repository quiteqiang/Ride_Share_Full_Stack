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
