const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');

const game = require('./game');
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

io.on('connection', socket =>{
    console.log('a user connected');
    
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
    console.log('server started port 5500');
});

