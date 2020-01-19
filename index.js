const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const users = require('./models/users');
const sequencerTable = require('./models/sequencerTable');

// See all users
app.get('/users', async (req, res) => {
    const theUsers = await users.all();
    // res.send('you want /users');
    res.json(theUsers);
})

// See all packs
app.get('/packs', async (req, res) => {
    const theSequencerPacks = await sequencerTable.getAllPacks();
    // res.send('you want /users');
    res.json(theSequencerPacks);
})

// See all sounds
app.get('/sequencerTable/allSounds', async (req, res) => {
    const theSounds = await sequencerTable.getAllSounds();
    // res.send('you want /users');
    res.json(theSounds);
})


// See every sound in each individual pack by id
app.get('/sequencerTable/allSounds/pack', async (req, res) => {
    const theSounds = await sequencerTable.getAllSoundsFromEachPack();
    // res.send('you want /users');
    res.json(theSounds);
})

// Get url for every sound a in a pack
app.get('/sounds/url', async (req, res) => {
    const theSounds = await sequencerTable.getAllSoundsFromEachPack();
    // res.send('you want /users');
    res.json(theSounds);
})

// get all urls by pack
app.get('/packs/url/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const theSounds = await sequencerTable.getAllUrlsFromEachPack(id);
    res.json(theSounds);
})


// get single pack by id
app.get('/packs/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const theSounds = await sequencerTable.getSinglePack(id);
    res.json(theSounds);
})

// get url for single sound
app.get('/sounds/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const theSounds = await sequencerTable.getUrlForSound(id);
    res.json(theSounds);
})


// app.get('/users/:id(\\d+)', async (req, res) => {
//     console.log('you want to get by id');
//     // show me a single pet by their id
//     const { id } = req.params;
//     const theUser = await users.one(id);
//     res.json(theUser);
// });

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
