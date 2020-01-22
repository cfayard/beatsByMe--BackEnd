const db = require('./connection');


// Get everything in sequencer packs table
async function all() {
    try {
        // .query and .any are the same function
        // const thePets = await db.query(`select * from pets;`);
        const theSequencerPacks = await db.any(`select * from packs;`);
        console.log(theSequencerPacks);
        return theSequencerPacks;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getAllSounds() {
    try {
        const theSequencerSounds = await db.any(`select sounds from packs;`);
        console.log(theSequencerSounds);
        return theSequencerSounds;
    } catch (err) {
        console.log(err)
        return [];
    }
}


// async function getNameForEachSound(name) {
//     try {
//         const theSoundName = await db.any(`select name from sounds where = ${id}`);
//         console.log(theSoundName);
//         return theSoundName;
//     } catch (err) {
//         console.log(err)
//         return [];
//     }
// }

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


async function getEverything() {
    try {
        const everything = await db.any(`select * from sounds, packs, soundpacks where sounds.id=soundpacks.soundid AND packs.id=soundpacks.packid AND soundpacks.packid = 3`);
        console.log(everything);
        return everything;
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
    getUrlForSound,
    getEverything
    // getNameForEachSoundx
}


// select url 
// from sounds
// 	where id in (select 1 from packs)

