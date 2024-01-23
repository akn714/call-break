const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const cookieParser = require('cookie-parser');

const cors = require('cors');

corsOptions = {
    origin: "http://172.16.13.192:3000"
}

app.use(cors(corsOptions))
app.use((req, res, next)=>{
    console.log(req.method, req.url);
    next();
})

const game = require('./game');     // game contains all function of game
const data = require('./data');

// let Games = {
//     // 'game name': {
//     //      'user name' : {},
//     //      'user name' : {},
//     //      'user name' : {},
//     //      'user name' : {}
//     // }
// };

let Games = data.Games;
const player_template = Object.assign({}, data.player_template);
const game_template = Object.assign({}, data.game_template);
let last_game_id;
let last_game;

io.on('connection', socket =>{
    console.log('a user connected');

    // let last_game = Games[Object.keys(Games)[Object.keys(Games).length-1]]
    
    // // console.log('last game', last_game)
    // if(last_game==undefined){
    //     let game_id = Math.floor(Math.random() * 0x50000 + 50000);
    //     Games[game_id] = game_template;
    //     Games[game_id].players[socket.id] = player_template;
    //     // console.log('player template', player_template)
    //     Games[game_id].players[socket.id].name = 'temp1';
    // }
    // else{
    //     if(Object.keys(last_game.players).length==4){
    //         let game_id = Math.floor(Math.random() * 0x50000 + 50000);
    //         Games[game_id] = game_template;
    //         Games[game_id].players[socket.id] = player_template;
    //         // console.log('player template', player_template)
    //         Games[game_id].players[socket.id].name = 'temp2';
    //     }
    //     else if(Object.keys(last_game.players).length<4){
    //         // console.log(89475284708174089274012874303247)
    //         last_game.players[socket.id] = player_template;
    //         last_game.players[socket.id].name = 'temp3';
    //         // console.log('player template', player_template)
    //     }
    // }
    // // if(last_game!=undefined) console.log('length', Object.keys(last_game).length)
    // // console.log(player_template)
    // console.log(socket.id, Games)
    // if(last_game!=undefined) console.log(last_game.players)

    
    // detecing disconnection
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        // delete users[socket.id];
    })

    socket.on('start-game', (gameID, playerID)=>{
        game.distribute_cards_(gameID);
        socket.broadcast.emit('player-data', Games[gameID].players[playerID]);
    })

    socket.on('reset_game', (gameID)=>{
        game.reset_game_(gameID);
    });

    socket.on('distribute_cards', (gameID)=>{
        game.distribute_cards_(gameID);
    });

    socket.on('drop_card_on_board', (card_shape, card_value, playerID, num)=>{
        // game.d
    });

    
});
app.use(express.urlencoded());
app.use(express.static('static'));
app.use(cookieParser());

// MIDDLEWARE
function join_a_game(req, res, next){

    let gameID, playerID;

    gameID = req.cookies.gameID;
    playerID = req.cookies.playerID;
    let playerName = req.body.name;

    if(!Object.keys(Games).includes(gameID)){ gameID=undefined; playerID=undefined; }

    console.log('before', gameID, playerID)

    if(gameID==undefined || playerID==undefined){

        /* ---------- CEATING SEPERATE GAME IF 4 MEMBERS HAVE JOINED A GAME ---------- */
    
        // let last_game = Games[Object.keys(Games)[Object.keys(Games).length-1]]
        // let last_game = Games[Object.keys(Games)[0]]
        last_game = Games[last_game_id]
        playerID = Math.floor(Math.random() * 0x50000 + 50000)
        gameID;
        
        if(last_game==undefined){
            gameID = Math.floor(Math.random() * 0x50000 + 50000);
            Games[gameID] = JSON.parse(JSON.stringify(game_template));
            Games[gameID].players[playerID] = JSON.parse(JSON.stringify(player_template));
            Games[gameID].players[playerID].name = playerName;
            last_game_id = gameID;
        }
        else{
            if(Object.keys(last_game.players).length==4){
                gameID = Math.floor(Math.random() * 0x50000 + 50000);
                console.log('game template', game_template)
                Games[gameID] = JSON.parse(JSON.stringify(game_template));
                Games[gameID].players[playerID] = JSON.parse(JSON.stringify(player_template));
                Games[gameID].players[playerID].name = playerName;
                last_game_id = gameID;
                
                game.distribute_cards_(gameID);

                // io.sockets.emit('starting-game', JSON.stringify(Games[gameID].players[playerID]))
                
            }
            else if(Object.keys(last_game.players).length<4){
                last_game.players[playerID] = JSON.parse(JSON.stringify(player_template));
                last_game.players[playerID].name = playerName;
            }
        }
        console.log('----------playerID, Games------------\n', playerID, Games)
        console.log('-------------------------------------')
    
        /* --------------------------------------------------------------------------- */

        res.cookie('gameID', last_game_id, { maxAge: 24 * 60 * 60 * 1000, secure: false, httpOnly: false, sameSite: 'none' });
        res.cookie('playerID', playerID, { maxAge: 24 * 60 * 60 * 1000, secure: false, httpOnly: false, sameSite: 'none' });
    }


    

    // console.log('last game id', last_game_id)
    console.log('after', last_game_id, playerID)
    // return res.json({
    //     'msg':'msg1'
    // })
    req.gameID = last_game_id;
    req.playerID = playerID;

    next();
}
function isJoinedTheGame(req, res, next){
    if(Games[req.gameID]==undefined){
        console.log('asdfasfd')
        return res.send("<h1>You have not joined any game</h1><br><p>Join a game: <a href='/join-a-game'>/join-a-game</a></p>")
    }
    else{
        next();
    }
}

// ENDPOINTS
app.use((req, res, next)=>{
    req.gameID = req.cookies.gameID;
    req.playerID = req.cookies.playerID;

    next();
})
app.get('/', isJoinedTheGame, (req, res)=>{
    console.log("ID's in req object: ", req.gameID, req.playerID)
    
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/game', isJoinedTheGame, (req, res)=>{
    try{
        if(Games[req.gameID]==undefined){
            res.cookie('gameID', '', { maxAge: new Date(), secure: false, httpOnly: false, sameSite: 'none' });
            res.cookie('playerID', '', { maxAge: new Date(), secure: false, httpOnly: false, sameSite: 'none' });
            return res.send("<h1>You have not joined any game</h1>")
        }
        res.json({
            "Game ID": req.gameID,
            "Player ID": req.playerID,  
            "Your Game": Games[req.gameID]
        })
    }
    catch(err){
        return res.json({
            error: err
        })
    }
})

app.get('/get-player-data/', isJoinedTheGame, (req, res)=>{
    try{
        return res.json({
            'data': Games[req.gameID].players[req.playerID]
        })
    }
    catch(err){
        return res.json({
            error: err
        })
    }
})

app.use((req, res, next)=>{
    try{
        if(Object.keys(Games).includes(req.gameID.toString())) return res.send('<h1>You have already joined a game</h1><br><p>Go to <a href="/game">/game</a></p>')
    }
    catch{}
    next();
})

app.get('/join-a-game', (req, res)=>{
    return res.sendFile(__dirname + '/views/joinAGame.html');
})
app.post('/join-a-game', join_a_game, (req, res)=>{
    console.log("ID's in req object: ", req.gameID, req.playerID);
    return res.send('<h1>Now you have joined a game</h1><br><p>Go to <a href="/game">/game</a></p>');
})

// app.get('/game', (req, res)=>{
//     let gameID = req.cookies.gameID;
    
//     if(gameID){
//         if(!Object.keys(Games).includes(gameID)){
//             res.cookie('gameID', '', { maxAge: new Date(), secure: true, httpOnly: true });
            
//             res.json({
//                 'message': 'This game is ended. Start a new game'
//             });
//         }
//         else if(Object.keys(Games).includes(gameID) && Games[gameID].length!=4){
//             if(req.cookies.playerID){
//                 res.sendFile(__dirname + '/index.html');
//             }
//             res.sendFile(__dirname + '/index.html');
//         }
//         else{

//         }
//     }
//     else{
//         gameID = Math.floor(Math.random()*0x1000000000).toString(16);
//         playerID = Math.floor(Math.random()*0x1000000000).toString(16);

//         res.cookie('gameID', gameID, { maxAge: 60*60*1000, secure: true, httpOnly: true });
//         res.cookie('playerID', playerID, { maxAge: 24*60*60*1000, secure: true, httpOnly: true });

//         // starting the game
//     }
    

// });

server.listen(3000, '0.0.0.0', ()=>{
    console.log('server started on port 3000');
});

