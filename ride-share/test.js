const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'faraday.cse.taylor.edu',
        user: 'tim_swanson',
        password: 'wijenara',
        database: 'tim_swanson'
    }
});

const Hapi = require('@hapi/hapi');

const init = async () => {
    // Create a new Hapi server
    const server = Hapi.server({
        host: 'localhost',
        port: 4000
    });

    // Output endpoints at startup.
    await server.register({plugin: require('blipp'),options: {showAuth: true}});

    // Log stuff.
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true
        }
    });

    server.route(
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Hello, Hapi';
            }
        },
    );
    server.route(
        {
            method: 'GET',
            path: '/ride',
            config: {
                description: 'Retrieve all countries'
            },
            handler: async (request, h) => {
                return await knex('ride').select('date', 'time','distance', 'fuelprice', 'fee');
            },
        }
    );
    await server.start();

}
// Catch promises lacking a .catch.
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

// Go!
init();
//knex('table_names').select('*').then(rows => console.log(rows)).then(() => knex.destroy());
