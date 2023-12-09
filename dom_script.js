
let cards_on_board_element = document.getElementsByClassName('cards_on_board');
let player_cards = document.getElementsByClassName('cards');

function clean_board(){
    cards_on_board_element[0].innerHTML = '';
}

function clean_all_cards(){
    clean_board();
    for(let i=0;i<player_cards.length;i++){
        player_cards[i].innerHTML = '';
    }
}

function drop_card_on_board(card, card_value, player, num){
    if(chance!=parseInt(player.substr(6))-1){
        alert(`player ${chance+1}'s chance`);
        return
    }
    let Player = null;
    if(player=='player1'){
        Player = player1_cards;
    }
    else if(player=='player2'){
        Player = player2_cards;
    }
    else if(player=='player3'){
        Player = player3_cards;
    }
    else if(player=='player4'){
        Player = player4_cards;
    }
    let card_on_board = document.createElement('div');
    card_on_board.setAttribute('class', 'card');
    card_on_board.innerHTML = `<img src=${Player[num].image}>`;
    card_on_board.style.background = card=='S' || card=='C'?'black':'red';
    play(Player,num,card,card_value);
    cards_on_board_element[0].appendChild(card_on_board);
}


