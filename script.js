// cards -> SPADE (S), DIMAND (D), HEART (H), CLUB (C)

let deck = [
    [{'card':'S','value':'A','p':52},{'card':'S','value':'K','p':51},{'card':'S','value':'Q','p':50},{'card':'S','value':'J','p':49},{'card':'S','value':'10','p':48},{'card':'S','value':'9','p':47},{'card':'S','value':'8','p':46},{'card':'S','value':'7','p':45},{'card':'S','value':'6','p':44},{'card':'S','value':'5','p':43},{'card':'S','value':'4','p':42},{'card':'S','value':'3','p':41},{'card':'S','value':'2','p':40}],
    [{'card':'D','value':'A'},{'card':'D','value':'K'},{'card':'D','value':'Q'},{'card':'D','value':'J'},{'card':'D','value':'10'},{'card':'D','value':'9'},{'card':'D','value':'8'},{'card':'D','value':'7'},{'card':'D','value':'6'},{'card':'D','value':'5'},{'card':'D','value':'4'},{'card':'D','value':'3'},{'card':'D','value':'2'}],
    [{'card':'H','value':'A'},{'card':'H','value':'K'},{'card':'H','value':'Q'},{'card':'H','value':'J'},{'card':'H','value':'10'},{'card':'H','value':'9'},{'card':'H','value':'8'},{'card':'H','value':'7'},{'card':'H','value':'6'},{'card':'H','value':'5'},{'card':'H','value':'4'},{'card':'H','value':'3'},{'card':'H','value':'2'}],
    [{'card':'C','value':'A'},{'card':'C','value':'K'},{'card':'C','value':'Q'},{'card':'C','value':'J'},{'card':'C','value':'10'},{'card':'C','value':'9'},{'card':'C','value':'8'},{'card':'C','value':'7'},{'card':'C','value':'6'},{'card':'C','value':'5'},{'card':'C','value':'4'},{'card':'C','value':'3'},{'card':'C','value':'2'}]
]


let player1_cards = []
let player2_cards = []
let player3_cards = []
let player4_cards = []

let player1_collection = []
let player2_collection = []
let player3_collection = []
let player4_collection = []

let available_cards = []
let already_distributed = []

function copy_to_cards(){
    for(let i=0;i<4;i++){
        for(let j=0;j<13;j++){
            if(deck[i][j].card!='S'){
                deck[i][j].p = 0;
            }
            available_cards.push(deck[i][j]);
        }
    }
}

function distribute_cards(){
    copy_to_cards();
    for(let i=0;i<13;i++){
        player1_cards.push(get_random_card('player1'));
        player2_cards.push(get_random_card('player2'));
        player3_cards.push(get_random_card('player3'));
        player4_cards.push(get_random_card('player4'));
    }
}


function get_random_card(player){
    let random = Math.floor(Math.random()*available_cards.length);
    let card = available_cards[random];

    delete available_cards[random];
    available_cards = available_cards.filter(Object);
    card.player = player;
    already_distributed.push(card);
    return card;
}


let board = []
let used_cards = []

// cards that are played and are on the board (max len -> 4)
let cards_on_board = []
let chaal = null;   // card which is used first
let chance = 0;

// this will return card with greatest priorarty in cards_on_board
function get_greatest_card(){
    // cards_on_board
    for(let i=0;i<4;i++){
        if(Object.keys(cards_on_board[i]).includes('S')){
            
        }
    }
}

// this will return player who has thrown the greatest card
function get_card_picker(){

}

function play(player){
    console.log(player);
    let num = prompt('enter which card do you want to use');
    let card = player[num];
    if(chance==0){
        chaal = card;
        chance++;
    }
    if(card.card==chaal.card && card.card!='S'){
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
        }
        chance++;
    }
    cards_on_board.push(card);
    if(cards_on_board.length==4){
        pick_cards();
        cards_on_board = [];
        chance = 0;
    }
    delete player[num];
    player = player.filter(Object);
}

function sort_cards_on_ground(){
    let temp;
    for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
            if(cards_on_board[j].p<cards_on_board[j+1].p){
                temp = cards_on_board[j];
                cards_on_board[j] = cards_on_board[j+1];
                cards_on_board[j+1] = temp;
            }
        }
    }
}

function pick_cards(){
    sort_cards_on_ground();
    if(cards_on_board[0].player=='player1'){
        alert('player 1 will pick the cards');
        cards_on_board.forEach(card=>{
            player1_collection.push(card);
        })
    }
    else if(cards_on_board[0].player=='player2'){
        alert('player 2 will pick the cards');
        cards_on_board.forEach(card=>{
            player2_collection.push(card);
        })
    }
    else if(cards_on_board[0].player=='player3'){
        alert('player 3 will pick the cards');
        cards_on_board.forEach(card=>{
            player3_collection.push(card);
        })
    }
    else if(cards_on_board[0].player=='player4'){
        alert('player 4 will pick the cards');
        cards_on_board.forEach(card=>{
            player4_collection.push(card);
        })
    }
}

