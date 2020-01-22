const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Create
function create(username, password) {
    const hash = createHash(password);
    const theuser =
    db.none(`insert into users(name, hash) values ($1, $2)`, [username, hash]);
    return hash;
    // values(name, hash);
    console.log('running this function');   
}

// Retrieve
async function login(username, password) {
    console.log("hey this functiOn is running")
    const theUser = await getByUsername(username);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByUsername(username) {
    const theUser =  await db.one(`
    select * from users where name=$1
    `, [username]);

    return theUser;
}


async function getById(id) {
    const theUser = await db.one(`
    select * from users where id =$1
    `, [id]);
    return theUser;
}
// Update

// Delete

// where name=$1
module.exports = {
    create,
    login,
    getByUsername,
    getById

};

