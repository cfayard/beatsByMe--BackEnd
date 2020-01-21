const db = require('./connection');


// Get everything in sequencer packs table
async function all() {
    try {
        // .query and .any are the same function
        // const thePets = await db.query(`select * from pets;`);
        const theSequencerPacks = await db.any(`select * from sequencerpacks;`);
        console.log(theSequencerPacks);
        return theSequencerPacks;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getAllSounds() {
    try {
        const theSequencerSounds = await db.any(`select sounds from sequencerpacks;`);
        console.log(theSequencerSounds);
        return theSequencerSounds;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getAllPacks() {
    try {
        const thePacks = await db.any(`select * from sounds where packs = 1`);
        console.log(thePacks);
        return thePacks;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getSinglePack(id) {
    try {
        const thePacks = await db.any(`select * from sounds where packs = ${id}`);
        console.log(thePacks);
        return thePacks;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getAllUrlsFromEachPack(id) {
    try {
        const theSoundsUrls = await db.any(`select url from sounds where packs = ${id}`);
        console.log(theSoundsUrls);
        return theSoundsUrls;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getUrlForSound(id) {
    try {
        const theSoundsUrls = await db.any(`select url from sounds where id = ${id}`);
        console.log(theSoundsUrls);
        return theSoundsUrls;
    } catch (err) {
        console.log(err)
        return [];
    }
}

module.exports = {
    all,
    getAllSounds,
    getAllPacks,
    getAllUrlsFromEachPack,
    getSinglePack,
    getUrlForSound
}


// select url 
// from sounds
// 	where id in (select 1 from packs)