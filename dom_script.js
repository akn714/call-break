
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
    console.log('c', c);
    if(c!=0){
        console.log('restricting')
        // restricting player to use some other card when it has the same shape card as chaal
        console.log(player_include(chaal.card, Player));
        if(player_include(chaal.card, Player)){
            if(card!=chaal.card){
                alert('Please choose a same shape card as chaal!');
                return
            }
            else if(player_include_greater_then(greatest_card_on_board, chaal.card, Player) && card_value<greatest_card_on_board){
                alert('Please choose a greater value card!');
                return
            }
            else{
                // player can use any card from same shape card as chaal
                // reset of the algorithm
            }
        }
        else if(!player_include(chaal.card, Player) && (player_include('S', Player) && card!='S')){
            alert("If you don't have same shape card as chaal then you have to use 'spade'!");
            return
        }
    }
    let card_on_board = document.createElement('div');
    card_on_board.setAttribute('class', 'card');
    card_on_board.innerHTML = `<img src=${Player[num].image}>`;
    card_on_board.style.background = card=='S' || card=='C'?'black':'red';
    console.log(cards_on_board_element);
    cards_on_board_element[0].appendChild(card_on_board);
    console.log(cards_on_board_element);
    play(Player,num,card,card_value);
}


