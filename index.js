const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
    secret: 'lalala1234lalala'
}));

app.use(express.static(path.join(__dirname, 'public')));

// Let's see what's in the session!!!!
app.use((req, res, next) =>  {
    console.log('***********');
    console.log(req.session);
    console.log('***********');

    next();
});

// See all users
app.get('/users', async (req, res) => {
    const theUsers = await users.all();
    // res.send('you want /users');
    res.json(theUsers);
})

// See all packs
// app.get('/packs', async (req, res) => {
//     const theSequencerPacks = await sequencerTable.getAllPacks();
//     // res.send('you want /users');
//     res.json(theSequencerPacks);
// })

// See all sounds
// app.get('/sequencerTable/allSounds', async (req, res) => {
//     const theSounds = await sequencerTable.getAllSounds();
//     // res.send('you want /users');
//     res.json(theSounds);
// })


// See every sound in each individual pack by id
// app.get('/sequencerTable/allSounds/pack', async (req, res) => {
//     const theSounds = await sequencerTable.getAllSoundsFromEachPack();
//     // res.send('you want /users');
//     res.json(theSounds);
// })

// Get url for every sound a in a pack
// app.get('/sounds/url', async (req, res) => {
//     const theSounds = await sequencerTable.getAllSoundsFromEachPack();
//     // res.send('you want /users');
//     res.json(theSounds);
// })

// get all urls by pack
// app.get('/packs/url/:id(\\d+)', async (req, res) => {
//     const { id } = req.params;
//     const theSounds = await sequencerTable.getAllUrlsFromEachPack(id);
//     res.json(theSounds);
// })


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
    // res.json(theSounds[0].url);
    res.render('soundItem', 
        {
            locals: {
                url: `/audio-files/${encodeURI(theSounds[0].url)}`
            }
        }
    )
});


// app.get('/users/:id(\\d+)', async (req, res) => {
//     console.log('you want to get by id');
//     // show me a single pet by their id
//     const { id } = req.params;
//     const theUser = await users.one(id);
//     res.json(theUser);
// });



const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
    // const parseJson = bodyParser.json();
const parseForm = bodyParser.urlencoded({
    extended: true
});

const server = http.createServer(app);

const users = require('./models/users');
const sequencerTable = require('./models/sequencerTable');


function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        console.log('requireLogin says your are OK');
        next();
    } else {
        res.redirect('/login');
    }
}

// Signup
app.get('/signup', (req, res) => {
    res.render('owners/signup');
});
    

app.post('/signup', parseForm, (req, res) => {
    const {name, password} = req.body;
    users.create(name, password);
    res.redirect('http://lethal-turn.surge.sh/');
    });
    
// Go to site
app.get('/', (req, res) => {
    res.render('templates/index');
});

app.post('/signup', parseForm, (req, res) => {
    const {name, password} = req.body;
    users.create(name, password);
    res.redirect('http://lethal-turn.surge.sh/');
    });

// Login!
app.get('/login', (req, res) => {
    res.render('owners/auth');
});

app.post('/login', parseForm, async (req, res) => {
    // console.log('does it work?');
    console.log(req.body);
    const { name, password } = req.body;
    const didLoginSuccessfully = await users.login(name, password).catch((error)=>console.log(error))
  
    console.log(didLoginSuccessfully);
if (didLoginSuccessfully == true) {
    console.log(`yay! you logged in!`);


    // Assuming users have unique names:
    const theUser = await users.getByUsername(name);

    // Add some info to the user's session
    req.session.user = {
        name,
        id: theUser.id
    };
    req.session.save(() => {
        console.log('The session is now saved!!!');
        // This avoids a long-standing
        // bug in the session middleware
        res.redirect('http://lethal-turn.surge.sh/');
    });
    

} else  {
    res.redirect('/signup');
}
});

app.get('/logout', (req, res) => {
    // Get rid of the user's session!
    // Then redirect them to the login page.
    req.session.destroy(() => {
        console.log('The session is now destroyed!!!');
        // This avoids a long-standing
        // bug in the session middleware
        res.redirect('/login');
    });
    
})

// Success
// app.get('/login/success', (req, res) => {
//     res.render('owners/success');
// });

// app.post('/login/success', (req, res) => {
//     res.render('owners/success');
// });

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});