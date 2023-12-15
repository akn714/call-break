let html = document.getElementsByTagName('html')[0];
html.style.background = 'green';

let flash_box = document.querySelector('#flash-msg');
function flash(msg, t){
    flash_box.style.display = 'flex';
    flash_box.innerText = msg;
    setTimeout(() => {
        flash_box.style.opacity = 1;
    }, 100);
    setTimeout(() => {
        flash_box.style.opacity = 0;
        setTimeout(() => {
            flash_box.style.display = 'none';
        }, 2000);
    }, t);
}

function start_game(){
    flash("Let's start the show down", 4000);
    setTimeout(() => {
        flash("Distribute cards using 'Distribute cards' button", 4000);
        setTimeout(() => {
            distribute.removeAttribute('disabled');
        }, 6000);
    }, 7000);
}
start_game();

function change_theme(){
    if(html.style.background=='red') html.style.background = 'green'
    else html.style.background = 'red';
}

let distribute = document.getElementById('distribute');
distribute.addEventListener('click', ()=>{
    distribute_cards();
    make_card_function();
    distribute.setAttribute('disabled', '')
});

let shapes = ['S', 'C', 'H', 'D'];
let values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

let can_pick = true;

let cards = document.getElementsByClassName('cards');
function make_card_function(){
    for(let i=0;i<4;i++){
        for(let j=0;j<13;j++){
            document.getElementById(`${shapes[i]}${values[j]}`).addEventListener('click', ()=>{
            // cards[i].children[j].addEventListener('click', ()=>{
                console.log(can_pick);
                if(can_pick){
                    let card = document.getElementById(`${shapes[i]}${values[j]}`);
                    let card_shape = card.getAttribute('card');
                    let card_value = card.getAttribute('value');
                    let num = card.getAttribute('num');
                    let player = card.getAttribute('player');
                    
                    console.log(card_shape, card_value, player, num);
                    
                    drop_card_on_board(card_shape, card_value, player, num);
                }
            });
        }
    }
}

let cards_on_board_element = document.getElementsByClassName('cards_on_board');
let player_cards = document.getElementsByClassName('cards');

function clean_board(){
    cards_on_board_element[0].innerHTML = '';
}

function clean_all_cards(){
    player1_cards = [];
    player2_cards = [];
    player3_cards = [];
    player4_cards = [];
    player1_collection = [];
    player2_collection = [];
    player3_collection = [];
    player4_collection = [];
    clean_board();
    for(let i=0;i<player_cards.length;i++){
        player_cards[i].innerHTML = '';
    }
}

function drop_card_on_board(card, card_value, player, num){
    if(chance!=parseInt(player.substr(6))-1){
        flash(`player ${chance+1}'s chance`, 3000);
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
                flash('Please choose a same shape card as chaal!', 3000);
                return
            }
            else if(player_include_greater_then(greatest_card_on_board, chaal.card, Player) && card_value<greatest_card_on_board){
                flash('Please choose a greater value card!', 3000);
                return
            }
            else{
                // player can use any card from same shape card as chaal
                // reset of the algorithm
            }
        }
        else if(!player_include(chaal.card, Player) && (player_include('S', Player) && card!='S')){
            flash("If you don't have same shape card as chaal then you have to use 'spade'!", 4000);
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
    play(Player, num, card, card_value);
}

function sort_all_cards(){
    for(let i=0;i<4;i++){
        let player = document.getElementById(`player${i}`);

    }
}

function sort_cards(){

}


