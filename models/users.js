const db = require('./connection');

async function all() {
    try {
        // .query and .any are the same function
        // const thePets = await db.query(`select * from pets;`);
        const theUsers = await db.any(`select * from users;`);
        console.log(theUsers);
        return theUsers;
    } catch (err) {
        console.log(err)
        return [];
    }
}

// Retrieve
async function one(id) {
    try {
        // Use .one() if there should exactly one result.
        // const onePet = await db.one(`select * from pets where id=${id}`);

        // $1 is syntax specfic to pg-promise
        // it means interpolate the 1st value from the array
        // (in this case, that's the `id` that we received as an argument)
        const oneUser = await db.one(`select * from users where id=$1`, [id]);
        return oneUser;
    } catch (err) {
        return null;
    }
}

module.exports = {
    all,
    one
}