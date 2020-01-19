const bcrypt = require('bcryptjs');

const userDb = [];
function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function createUser(username, password) {
    const hash = createHash(password);
    const newUser = {
        username,
        hash
    };
    console.log(newUser);
    userDb.push(newUser);
}

function getUser(username) {
    return userDb.find(user => user.username == username);
}

function login(username, password) {
    const theUser = getUser(username);
    return bcrypt.compareSync(password, theUser.hash);
}


const db = [];

function all() {
    // return copyOf(db);
    // return db; // this gives them
                  // access to the
                  // original

    return [   // return a new array
        ...db  // with the contents of
               // `db` sprinkled
               // inside.
    ];
}

function create(name, joyVal) {
    // If I wanted to store 'on' or 'off'
    // instead of 'on' or undefined
    // let givesJoy = joyVal || 'off';

    // I want test if `joyVal` is truthy
    // if it is, I want `true`
    // else, I want `false`
    // let givesJoy;
    // if (joyVal) {
    //     givesJoy = true;
    // } else {
    //     givesJoy = false;
    // }

    // This is the ternary operator:
    let givesJoy = joyVal ? true : false;
    // let givesJoy = joyVal ? '💥' : '💩';

    // It tests a value for truthy-ness
    // If the value is truthy, resolves to the 
    // thing to the left of the colon.
    // If the value is false, resolves to the
    // thing to the right of colon.

    const newItem = {
        name,
        givesJoy
    };
    db.push(newItem);
}

const stuff = {
    all,
    create
};

const users = {
    create: createUser,
    login
};

module.exports = {
    stuff,
    users
};