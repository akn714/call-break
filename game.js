let { Deck, Games } = require('./data');

// let game_id = 0     // game_id's are key in Games

// let players = Object.keys(Games[game_id].players);      // players are keys in Games[game_id].players object

// checked
module.exports.reset_game_ = (game_id) => {
    console.log(`game ${game_id} reset`);

    clean_all_cards_(game_id);
    
    Games[game_id].available_cards = [];
    Games[game_id].already_distributed = [];
    Games[game_id].board = [];
    Games[game_id].used_cards = [];
    Games[game_id].cards_on_board = [];
    Games[game_id].chaal =  0;
    Games[game_id].c =  0;
    Games[game_id].greatest_card_on_board =  0;
}

// checked
module.exports.distribute_cards_ = (game_id) => {
    let players = Object.keys(Games[game_id].players);

    try {
        clean_all_cards_(game_id);
    }
    catch (err){
        console.log('All boards are already clear');
    }
    copy_to_cards_(game_id);
    
    for(let i=0;i<13;i++){        
        for(let i=0;i<4;i++){
            let random_card = get_random_card_(game_id, players[i]);
            Games[game_id].players[players[i]].cards.push(random_card);
        }
    }
}

// checked
function clean_all_cards_(game_id){
    let players = Object.keys(Games[game_id].players);
    for(let i=0;i<4;i++){
        Games[game_id].players[players[i]].cards = [];
        Games[game_id].players[players[i]].collection = [];
    }
    // clean_board();
    // for(let i=0;i<player_cards.length;i++){
    //     player_cards[i].innerHTML = '';
    // }
}

// checked
function get_random_card_(game_id, player_id){
    let random = Math.floor(Math.random()*Games[game_id].available_cards.length);
    let card = Games[game_id].available_cards[random];

    delete Games[game_id].available_cards[random];
    Games[game_id].available_cards = Games[game_id].available_cards.filter(Object);
    card.player = player_id;
    Games[game_id].already_distributed.push(card);
    return card;
}

// checked
// copies all cards from Deck to available_cards
function copy_to_cards_(game_id){
    for(let i=0;i<4;i++){
        for(let j=0;j<13;j++){
            if(Deck[i][j].card!='S'){
                Deck[i][j].p = 0;
            }
            Games[game_id].available_cards.push(Deck[i][j]);
        }
    }
}


function play_(player_id, num, card_shape, card_value){
    console.log(chance);
    // if(chance!=parseInt(player[num].player.substr(6))-1){
    //     flash('Not your chance');
    //     return
    // }
    console.log(Games[game_id].players[player_id]);
    // "num" is the index of card in cards array that player choose
    let card = Games[game_id].players[player_id].cards[num];
    
    let cv; // card value is an integer
    if(card.value=='A'){
        cv = 13;
    }
    else if(card.value=='K'){
        cv = 12;
    }
    else if(card.value=='Q'){
        cv = 11;
    }
    else if(card.value=='J'){
        cv = 10;
    }
    else{
        cv = parseInt(card.value)-1;
    }

    if(Games[game_id].c==0){
        Games[game_id].chaal = card;
        Games[game_id].greatest_card_on_board = parseInt(cv);
    }
    if(card.card==Games[game_id].chaal.card && card.card!='S'){
        if(card.value=='A'){
            card.p = 13
        }
        else if(card.value=='K'){
            card.p = 12;
        }
        else if(card.value=='Q'){
            card.p = 11;
        }
        else if(card.value=='J'){
            card.p = 10;
        }
        else{
            card.p = parseInt(card.value)-1;
            cv = parseInt(card.value)-1;    // cv: card value
        }
    }
    Games[game_id].cards_on_board.push(card);
    Games[game_id].chance++;
    Games[game_id].c++;
    console.log(card, Games[game_id].players[player_id].cards[num]);
    if(Games[game_id].cards_on_board.length==4){
        pick_cards_(game_id);
        Games[game_id].cards_on_board = [];
        Games[game_id].c = 0;
    }
    delete Games[game_id].players[player_id].cards[num];
    // player = player.filter(Object);

    // -------------------------- FRONTEND--------------------------
    // let card_to_remove = document.getElementById(`${card_shape}${card_value}`);
    // console.log(card_to_remove);
    // card_to_remove.parentElement.removeChild(card_to_remove);
    // -------------------------- FRONTEND --------------------------

    if(Games[game_id].chance>=4){
        Games[game_id].chance = 0;
    }
    console.log(card.card, Games[game_id].chaal.card, cv, Games[game_id].greatest_card_on_board);
    if(card.card==Games[game_id].chaal.card && cv>Games[game_id].greatest_card_on_board){
        Games[game_id].greatest_card_on_board = cv;
    }
    console.log(card.card, Games[game_id].chaal.card, cv, Games[game_id].greatest_card_on_board);
}

// checked
function player_include_(game_id, shape, player_id){
    for(let i=0;i<13;i++){
        if(Games[game_id].players[player_id].cards[i] && Games[game_id].players[player_id].cards[i].card==shape){
            return true
        }
    }
    return false
}

// checked
function player_include_greater_then_(game_id, value, shape, player_id){
    let card_value;
    for(let i=0;i<13;i++){
        if(Games[game_id].players[player_id].cards[i]){
            if(Games[game_id].players[player_id].cards[i].value=='A'){
                card_value = 13
            }
            else if(Games[game_id].players[player_id].cards[i].value=='K'){
                card_value = 12;
            }
            else if(Games[game_id].players[player_id].cards[i].value=='Q'){
                card_value = 11;
            }
            else if(Games[game_id].players[player_id].cards[i].value=='J'){
                card_value = 10;
            }
            else{
                card_value = parseInt(Games[game_id].players[player_id].cards[i].value)-1;
            }
            console.log('card_value:', card_value);
            if(Games[game_id].players[player_id].cards[i] && Games[game_id].players[player_id].cards[i].card==shape && card_value>value){
                return true
            }
        }
    }
    return false
}

// checked
function sort_cards_on_ground_(game_id){
    let temp;
    for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
            if(Games[game_id].cards_on_board[j].p<Games[game_id].cards_on_board[j+1].p){
                temp = Games[game_id].cards_on_board[j];
                Games[game_id].cards_on_board[j] = Games[game_id].cards_on_board[j+1];
                Games[game_id].cards_on_board[j+1] = temp;
            }
        }
    }

    // TO RETURN MAXIMUM VALUE
    // let a = Games[game_id].cards_on_board[0].p;
    // let b = Games[game_id].cards_on_board[1].p;
    // let c = Games[game_id].cards_on_board[2].p;
    // let d = Games[game_id].cards_on_board[3].p;

    // return Math.max(a,b,c,d)
}

// checked
function pick_cards_(game_id){
    sort_cards_on_ground_(game_id);

    flash(`${Games[game_id].players[Games[game_id].cards_on_board[0].player].name} will pick the cards`);
    // Games[game_id].chance = 0;  // have to edit this thing
    Games[game_id].chance = Games[game_id].players[Games[game_id].cards_on_board[0].player].chance_number
    Games[game_id].cards_on_board.forEach(card=>{
        Games[game_id].players[Games[game_id].cards_on_board[0].player].collection.push(card);
    });

    // if(Games[game_id].cards_on_board[0].player=='player1'){
    //     flash('player 1 will pick the cards');
    //     Games[game_id].chance = 0;
    //     Games[game_id].cards_on_board.forEach(card=>{
    //         Games[game_id].players[player_id].collection.push(card);
    //     })
    //     // document.getElementById('haath-counter1').innerText = player1_collection.length/4;
    // }
    // else if(Games[game_id].cards_on_board[0].player=='player2'){
    //     flash('player 2 will pick the cards');
    //     Games[game_id].chance = 1;
    //     Games[game_id].cards_on_board.forEach(card=>{
    // Games[game_id].players[player_id].collection.push(card);
    //     })
    //     // document.getElementById('haath-counter2').innerText = player2_collection.length/4;
    // }
    // else if(Games[game_id].cards_on_board[0].player=='player3'){
    //     flash('player 3 will pick the cards');
    //     Games[game_id].chance = 2;
    //     Games[game_id].cards_on_board.forEach(card=>{
    //         Games[game_id].players[player_id].collection.push(card);
    //     })
    //     // document.getElementById('haath-counter3').innerText = player3_collection.length/4;
    // }
    // else if(Games[game_id].cards_on_board[0].player=='player4'){
    //     flash('player 4 will pick the cards');
    //     Games[game_id].chance = 3;
    //     Games[game_id].cards_on_board.forEach(card=>{
    //         Games[game_id].players[player_id].collection.push(card);
    //     })
    //     // document.getElementById('haath-counter4').innerText = player4_collection.length/4;
    // }
    can_pick = false;
    // setTimeout(() => {
    //     clean_board();
    //     can_pick = true;
    //     if(player1_cards.filter(Object).length==0){
    //         restart_game();
    //         document.body.style.height = '100vh';
    //     }
    // }, 4000);
}

// checked
function restart_game_(game_id){
    declare_winner_(game_id);
    // distribute.removeAttribute('disabled');
}

// checked
function declare_winner_(game_id){
    let players = Object.keys(Games[game_id].players);

    // pxc -> Player X Collection
    let p1c = players[0].length;
    let p2c = players[1].length;
    let p3c = players[2].length;
    let p4c = players[3].length;

    // if(p1c==p2c) flash(`Tie between player ${players[0]} and ${players[1]}`, 4000);
    // if(p1c==p3c) flash(`Tie between player ${players[0]} and ${players[2]}`, 4000);
    // if(p1c==p4c) flash(`Tie between player ${players[0]} and ${players[3]}`, 4000);

    // if(p2c==p3c) flash(`Tie between player ${players[1]} and ${players[2]}`, 4000);
    // if(p2c==p4c) flash(`Tie between player ${players[1]} and ${players[3]}`, 4000);

    // if(p3c==p4c) flash(`Tie between player ${players[2]} and ${players[3]}`, 4000);

    // console

    if(p1c==p2c && p2c==p3c && p3c==p4c && p4c==0){
        flash('Game is not yet started', 4000);
        return
    }
    if(p1c>=p2c){
        // if(p1c==p2c) flash('Tie between player 1 and 4', 4000); 
        if(p1c==p2c) flash(`Tie between player ${Games[game_id].players[players[0]].name} and ${Games[game_id].players[players[3]].name}`, 4000); 
        else if(p1c>p3c){
            // if(p1c==p3c) flash('Tie between player 1 and 3', 4000);
            if(p1c==p3c) flash(`Tie between player ${Games[game_id].players[players[0]].name} and ${Games[game_id].players[players[2]].name}`, 4000);
            // if(p1c==p4c){ flash('Tie between player 1 and 4', 4000); return }
            if(p1c==p4c){ flash(`Tie between player ${Games[game_id].players[players[0]].name} and ${Games[game_id].players[players[3]].name}`, 4000); return }
            else if(p1c>p4c){
                // flash('player 1 is winner', 4000);
                flash(`${Games[game_id].players[players[0]].name} is winner`, 4000);
            }
            else{
                // flash('player 4 is winner', 4000);
                flash(`${Games[game_id].players[players[3]].name} is winner`, 4000);
            }
        }
        else{
            if(p3c>p4c){
                // flash('player 3 is winner', 4000);
                flash(`${Games[game_id].players[players[2]].name} is winner`, 4000);
            }
            else{
                // flash('player 4 is winner', 4000);
                flash(`${Games[game_id].players[players[3]].name} is winner`, 4000);
            }
        }
    }
    else{
        if(p2c>p3c){
            if(p2c>p4c){
                // flash('player 1 is winner', 4000);
                flash(`${Games[game_id].players[players[0]].name} is winner`, 4000);
            }
            else{
                // flash('player 4 is winner', 4000);
                flash(`${Games[game_id].players[players[3]].name} is winner`, 4000);
            }
        }
        else{
            if(p3c>p4c){
                // flash('player 3 is winner', 4000);
                flash(`${Games[game_id].players[players[2]].name} is winner`, 4000);
            }
            else{
                // flash('player 4 is winner', 4000);
                flash(`${Games[game_id].players[players[3]].name} is winner`, 4000);
            }
        }
    }


    clean_all_cards_(game_id);
    Games[game_id].already_distributed = [];
    Games[game_id].available_cards = [];
    
    // document.getElementById('haath-counter1').innerText = 0;
    // document.getElementById('haath-counter2').innerText = 0;
    // document.getElementById('haath-counter3').innerText = 0;
    // document.getElementById('haath-counter4').innerText = 0;

    // document.body.style.height = '100vh';
}




