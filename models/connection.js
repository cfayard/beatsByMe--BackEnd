// require 'pg-promise', but call it immediately
// so we can configure the connection
const pgp = require('pg-promise')({
    query: e => {
        // print the SQL query
        console.log(`QUERY: ${e.query}`);
    }
});

// next, give the info about our specific database
// that we're talking to
const options = {
    host: 'localhost',
    database: 'audio-library'
};

const db = pgp(options);
module.exports = db;