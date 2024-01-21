const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');

const cors = require('cors');

corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

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


    socket.on('reset_game', (game_id)=>{
        game.reset_game_(game_id);
    });

    socket.on('distribute_cards', (game_id)=>{
        game.distribute_cards_(game_id);
    });

    socket.on('drop_card_on_board', (card_shape, card_value, player_id, num)=>{
        // game.d
    });

    
});
app.use(express.urlencoded());
app.use(express.static('static'));
app.use(cookieParser());

// MIDDLEWARE
app.use((req, res, next)=>{

    // let last_game = Games[Object.keys(Games)[Object.keys(Games).length-1]]
    // let last_game = Games[Object.keys(Games)[0]]
    last_game = Games[last_game_id]
    let playerID = Math.floor(Math.random() * 0x50000 + 50000)
    
    if(last_game==undefined){
        let game_id = Math.floor(Math.random() * 0x50000 + 50000);
        Games[game_id] = JSON.parse(JSON.stringify(game_template));
        Games[game_id].players[playerID] = JSON.parse(JSON.stringify(player_template));
        Games[game_id].players[playerID].name = 'temp1';
        last_game_id = game_id;
    }
    else{
        if(Object.keys(last_game.players).length==4){
            let game_id = Math.floor(Math.random() * 0x50000 + 50000);
            console.log('game template', game_template)
            Games[game_id] = JSON.parse(JSON.stringify(game_template));
            Games[game_id].players[playerID] = JSON.parse(JSON.stringify(player_template));
            Games[game_id].players[playerID].name = 'temp2';
            last_game_id = game_id;
        }
        else if(Object.keys(last_game.players).length<4){
            last_game.players[playerID] = JSON.parse(JSON.stringify(player_template));
            last_game.players[playerID].name = 'temp3';
        }
    }
    console.log('----------playerID, Games------------\n', playerID, Games)
    console.log('-------------------------------------')




    let game_id = req.cookies.game_id;
    let player_id = req.cookies.player_id;

    console.log(game_id, player_id);
    // return res.json({
    //     'msg':'msg1'
    // })
    req.game_id = game_id;
    req.player_id = player_id;

    next();
});

// ENDPOINTS
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res)=>{
    let game_id = req.cookies.game_id;
    
    if(game_id){
        if(!Object.keys(Games).includes(game_id)){
            res.cookie('game_id', '', { maxAge: new Date(), secure: true, httpOnly: true });
            
            res.json({
                'message': 'This game is ended. Start a new game'
            });
        }
        else if(Object.keys(Games).includes(game_id) && Games[game_id].length!=4){
            if(req.cookies.player_id){
                res.sendFile(__dirname + '/index.html');
            }
            res.sendFile(__dirname + '/index.html');
        }
        else{

        }
    }
    else{
        game_id = Math.floor(Math.random()*0x1000000000).toString(16);
        player_id = Math.floor(Math.random()*0x1000000000).toString(16);

        res.cookie('game_id', game_id, { maxAge: 60*60*1000, secure: true, httpOnly: true });
        res.cookie('player_id', player_id, { maxAge: 24*60*60*1000, secure: true, httpOnly: true });

        // starting the game
    }
    

});

server.listen(3000, ()=>{
    console.log('server started on port 3000');
});

