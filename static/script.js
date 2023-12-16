let Player = null;

socket.emit('get_player');
socket.on('get_player', (player_data)=>{
    Player = player_data;
});

function updatePlayer(){
    // this function will update player player data on server...
    // ...using socket
    socket.emit('update_player', Player);
}

function getPlayer(){
    return Player;
}


