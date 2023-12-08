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
    try {
        clean_all_cards();
    }
    catch (err){
        console.log('All boards are already clear');
    }
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    let player3 = document.getElementById('player3');
    let player4 = document.getElementById('player4');
    copy_to_cards();
    for(let i=0;i<13;i++){
        let p1card = get_random_card('player1');
        let p2card = get_random_card('player2');
        let p3card = get_random_card('player3');
        let p4card = get_random_card('player4');
        player1_cards.push(p1card);
        player2_cards.push(p2card);
        player3_cards.push(p3card);
        player4_cards.push(p4card);

        let p1card_ele = document.createElement('div');
        p1card_ele.setAttribute('class', 'card');
        p1card_ele.setAttribute('id', `${p1card.card}${p1card.value}`);
        p1card_ele.setAttribute('card', `${p1card.card}`);
        p1card_ele.setAttribute('value', `${p1card.value}`);
        p1card_ele.setAttribute('num', `${i}`);
        p1card_ele.setAttribute('player', `player1`);
        p1card_ele.style.background = p1card.card=='S' || p1card.card=='C'?'#777777':'#ff4343';
        p1card_ele.innerText = `${p1card.card} ${p1card.value}`;
        player1.children[1].appendChild(p1card_ele);
        
        let p2card_ele = document.createElement('div');
        p2card_ele.setAttribute('class', 'card');
        p2card_ele.setAttribute('id', `${p2card.card}${p2card.value}`);
        p2card_ele.setAttribute('card', `${p2card.card}`);
        p2card_ele.setAttribute('value', `${p2card.value}`);
        p2card_ele.setAttribute('num', `${i}`);
        p2card_ele.setAttribute('player', `player2`);
        p2card_ele.style.background = p2card.card=='S' || p2card.card=='C'?'#777777':'#ff4343';
        p2card_ele.innerText = `${p2card.card} ${p2card.value}`;
        player2.children[1].appendChild(p2card_ele);
        
        let p3card_ele = document.createElement('div');
        p3card_ele.setAttribute('class', 'card');
        p3card_ele.setAttribute('id', `${p3card.card}${p3card.value}`);
        p3card_ele.setAttribute('card', `${p3card.card}`);
        p3card_ele.setAttribute('value', `${p3card.value}`);
        p3card_ele.setAttribute('num', `${i}`);
        p3card_ele.setAttribute('player', `player3`);
        p3card_ele.style.background = p3card.card=='S' || p3card.card=='C'?'#777777':'#ff4343';
        p3card_ele.innerText = `${p3card.card} ${p3card.value}`;
        player3.children[1].appendChild(p3card_ele);
        
        let p4card_ele = document.createElement('div');
        p4card_ele.setAttribute('class', 'card');
        p4card_ele.setAttribute('id', `${p4card.card}${p4card.value}`);
        p4card_ele.setAttribute('card', `${p4card.card}`);
        p4card_ele.setAttribute('value', `${p4card.value}`);
        p4card_ele.setAttribute('num', `${i}`);
        p4card_ele.setAttribute('player', `player4`);
        p4card_ele.style.background = p4card.card=='S' || p4card.card=='C'?'#777777':'#ff4343';
        p4card_ele.innerText = `${p4card.card} ${p4card.value}`;
        player4.children[1].appendChild(p4card_ele);
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
// function get_card_picker(){

// }

function play(player, num, card_shape, card_value){
    console.log(chance);
    // if(chance!=parseInt(player[num].player.substr(6))-1){
    //     alert('Not your chance');
    //     return
    // }
    console.log(player);
    let card = player[num];
    if(chance==0){
        chaal = card;
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
    }
    cards_on_board.push(card);
    chance++;
    
    console.log(card, player[num])
    if(cards_on_board.length==4){
        pick_cards();
        cards_on_board = [];
        chance = 0;
    }
    delete player[num];
    // player = player.filter(Object);
    let card_to_remove = document.getElementById(`${card_shape}${card_value}`);
    console.log(card_to_remove);
    card_to_remove.parentElement.removeChild(card_to_remove);
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
    setTimeout(() => {
        clean_board();
        if(player1_cards.length==0){
            restart_game();
        }
    }, 4000);
}

function restart_game(){
    declare_winner();
    distribute.setAttribute('disabled', 'false');
}

function declare_winner(){
    let p1collection = player1_collection.length;
    let p2collection = player2_collection.length;
    let p3collection = player3_collection.length;
    let p4collection = player4_collection.length;

    if(p1collection>p2collection){
        if(p1collection>p3collection){
            if(p1collection>p4collection){
                alert('player 1 is winner');
            }
            else{
                alert('player 4 is winner');
            }
        }
        else{
            if(p3collection>p4collection){
                alert('player 3 is winner');
            }
            else{
                alert('player 4 is winner');
            }
        }
    }
    else{
        if(p2collection>p3collection){
            if(p2collection>p4collection){
                alert('player 1 is winner');
            }
            else{
                alert('player 4 is winner');
            }
        }
        else{
            if(p3collection>p4collection){
                alert('player 3 is winner');
            }
            else{
                alert('player 4 is winner');
            }
        }
    }

    player1_collection = [];
    player2_collection = [];
    player3_collection = [];
    player4_collection = [];
    player1_cards = [];
    player2_cards = [];
    player3_cards = [];
    player4_cards = [];
    already_distributed = [];
    available_cards = [];
}





