// cards -> SPADE (S), DIMAND (D), HEART (H), CLUB (C)

let deck = [
    [{'image':'images/ace_of_spades.png', 'card':'S','value':'A','p':52},{'image':'images/king_of_spades2.png', 'card':'S','value':'K','p':51},{'image':'images/queen_of_spades2.png', 'card':'S','value':'Q','p':50},{'image':'images/jack_of_spades2.png', 'card':'S','value':'J','p':49},{'image':'images/10_of_spades.png', 'card':'S','value':'10','p':48},{'image':'images/9_of_spades.png', 'card':'S','value':'9','p':47},{'image':'images/8_of_spades.png', 'card':'S','value':'8','p':46},{'image':'images/7_of_spades.png', 'card':'S','value':'7','p':45},{'image':'images/6_of_spades.png', 'card':'S','value':'6','p':44},{'image':'images/5_of_spades.png', 'card':'S','value':'5','p':43},{'image':'images/4_of_spades.png', 'card':'S','value':'4','p':42},{'image':'images/3_of_spades.png', 'card':'S','value':'3','p':41},{'image':'images/2_of_spades.png', 'card':'S','value':'2','p':40}],
    [{'image':'images/ace_of_diamonds.png', 'card':'D','value':'A'},{'image':'images/king_of_diamonds2.png', 'card':'D','value':'K'},{'image':'images/queen_of_diamonds2.png', 'card':'D','value':'Q'},{'image':'images/jack_of_diamonds2.png', 'card':'D','value':'J'},{'image':'images/10_of_diamonds.png', 'card':'D','value':'10'},{'image':'images/9_of_diamonds.png', 'card':'D','value':'9'},{'image':'images/8_of_diamonds.png', 'card':'D','value':'8'},{'image':'images/7_of_diamonds.png', 'card':'D','value':'7'},{'image':'images/6_of_diamonds.png', 'card':'D','value':'6'},{'image':'images/5_of_diamonds.png', 'card':'D','value':'5'},{'image':'images/4_of_diamonds.png', 'card':'D','value':'4'},{'image':'images/3_of_diamonds.png', 'card':'D','value':'3'},{'image':'images/2_of_diamonds.png', 'card':'D','value':'2'}],
    [{'image':'images/ace_of_hearts.png', 'card':'H','value':'A'},{'image':'images/king_of_hearts2.png', 'card':'H','value':'K'},{'image':'images/queen_of_hearts2.png', 'card':'H','value':'Q'},{'image':'images/jack_of_hearts2.png', 'card':'H','value':'J'},{'image':'images/10_of_hearts.png', 'card':'H','value':'10'},{'image':'images/9_of_hearts.png', 'card':'H','value':'9'},{'image':'images/8_of_hearts.png', 'card':'H','value':'8'},{'image':'images/7_of_hearts.png', 'card':'H','value':'7'},{'image':'images/6_of_hearts.png', 'card':'H','value':'6'},{'image':'images/5_of_hearts.png', 'card':'H','value':'5'},{'image':'images/4_of_hearts.png', 'card':'H','value':'4'},{'image':'images/3_of_hearts.png', 'card':'H','value':'3'},{'image':'images/2_of_hearts.png', 'card':'H','value':'2'}],
    [{'image':'images/ace_of_clubs.png', 'card':'C','value':'A'},{'image':'images/king_of_clubs2.png', 'card':'C','value':'K'},{'image':'images/queen_of_clubs2.png', 'card':'C','value':'Q'},{'image':'images/jack_of_clubs2.png', 'card':'C','value':'J'},{'image':'images/10_of_clubs.png', 'card':'C','value':'10'},{'image':'images/9_of_clubs.png', 'card':'C','value':'9'},{'image':'images/8_of_clubs.png', 'card':'C','value':'8'},{'image':'images/7_of_clubs.png', 'card':'C','value':'7'},{'image':'images/6_of_clubs.png', 'card':'C','value':'6'},{'image':'images/5_of_clubs.png', 'card':'C','value':'5'},{'image':'images/4_of_clubs.png', 'card':'C','value':'4'},{'image':'images/3_of_clubs.png', 'card':'C','value':'3'},{'image':'images/2_of_clubs.png', 'card':'C','value':'2'}]
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
        p1card_ele.style.background = p1card.card=='S' || p1card.card=='C'?'black':'red';
        p1card_ele.innerHTML = `<img src=${p1card.image}>`;
        player1.children[1].appendChild(p1card_ele);
        
        let p2card_ele = document.createElement('div');
        p2card_ele.setAttribute('class', 'card');
        p2card_ele.setAttribute('id', `${p2card.card}${p2card.value}`);
        p2card_ele.setAttribute('card', `${p2card.card}`);
        p2card_ele.setAttribute('value', `${p2card.value}`);
        p2card_ele.setAttribute('num', `${i}`);
        p2card_ele.setAttribute('player', `player2`);
        p2card_ele.style.background = p2card.card=='S' || p2card.card=='C'?'black':'red';
        p2card_ele.innerHTML = `<img src=${p2card.image}>`;
        player2.children[1].appendChild(p2card_ele);
        
        let p3card_ele = document.createElement('div');
        p3card_ele.setAttribute('class', 'card');
        p3card_ele.setAttribute('id', `${p3card.card}${p3card.value}`);
        p3card_ele.setAttribute('card', `${p3card.card}`);
        p3card_ele.setAttribute('value', `${p3card.value}`);
        p3card_ele.setAttribute('num', `${i}`);
        p3card_ele.setAttribute('player', `player3`);
        p3card_ele.style.background = p3card.card=='S' || p3card.card=='C'?'black':'red';
        p3card_ele.innerHTML = `<img src=${p3card.image}>`;
        player3.children[1].appendChild(p3card_ele);
        
        let p4card_ele = document.createElement('div');
        p4card_ele.setAttribute('class', 'card');
        p4card_ele.setAttribute('id', `${p4card.card}${p4card.value}`);
        p4card_ele.setAttribute('card', `${p4card.card}`);
        p4card_ele.setAttribute('value', `${p4card.value}`);
        p4card_ele.setAttribute('num', `${i}`);
        p4card_ele.setAttribute('player', `player4`);
        p4card_ele.style.background = p4card.card=='S' || p4card.card=='C'?'black':'red';
        p4card_ele.innerHTML = `<img src=${p4card.image}>`;
        player4.children[1].appendChild(p4card_ele);
    }
    document.body.style.height = 'auto';
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
let c = 0;

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
let greatest_card_on_board = 0;

function play(player, num, card_shape, card_value){
    console.log(chance);
    // if(chance!=parseInt(player[num].player.substr(6))-1){
    //     flash('Not your chance');
    //     return
    // }
    console.log(player);
    let card = player[num];
    
    let cv; // card value in integer
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

    if(c==0){
        chaal = card;
        greatest_card_on_board = parseInt(cv);
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
            cv = parseInt(card.value)-1;
        }
    }
    cards_on_board.push(card);
    chance++;
    c++;
    console.log(card, player[num])
    if(cards_on_board.length==4){
        pick_cards();
        cards_on_board = [];
        c = 0;
    }
    delete player[num];
    // player = player.filter(Object);
    let card_to_remove = document.getElementById(`${card_shape}${card_value}`);
    console.log(card_to_remove);
    card_to_remove.parentElement.removeChild(card_to_remove);
    if(chance>=4){
        chance = 0;
    }
    console.log(card.card, chaal.card, cv, greatest_card_on_board);
    if(card.card==chaal.card && cv>greatest_card_on_board){
        greatest_card_on_board = cv;
    }
    console.log(card.card, chaal.card, cv, greatest_card_on_board);
}

function player_include(shape, player){
    for(let i=0;i<13;i++){
        if(player[i] && player[i].card==shape){
            return true
        }
    }
    return false
}

function player_include_greater_then(value, shape, player){
    let card_value;
    for(let i=0;i<13;i++){
        if(player[i]){
            if(player[i].value=='A'){
                card_value = 13
            }
            else if(player[i].value=='K'){
                card_value = 12;
            }
            else if(player[i].value=='Q'){
                card_value = 11;
            }
            else if(player[i].value=='J'){
                card_value = 10;
            }
            else{
                card_value = parseInt(player[i].value)-1;
            }
            console.log('card_value:', card_value);
            if(player[i] && player[i].card==shape &&card_value>value){
                return true
            }
        }
    }
    return false
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
        flash('player 1 will pick the cards');
        chance = 0;
        cards_on_board.forEach(card=>{
            player1_collection.push(card);
        })
        document.getElementById('haath-counter1').innerText = player1_collection.length/4;
    }
    else if(cards_on_board[0].player=='player2'){
        flash('player 2 will pick the cards');
        chance = 1;
        cards_on_board.forEach(card=>{
            player2_collection.push(card);
        })
        document.getElementById('haath-counter2').innerText = player2_collection.length/4;
    }
    else if(cards_on_board[0].player=='player3'){
        flash('player 3 will pick the cards');
        chance = 2;
        cards_on_board.forEach(card=>{
            player3_collection.push(card);
        })
        document.getElementById('haath-counter3').innerText = player3_collection.length/4;
    }
    else if(cards_on_board[0].player=='player4'){
        flash('player 4 will pick the cards');
        chance = 3;
        cards_on_board.forEach(card=>{
            player4_collection.push(card);
        })
        document.getElementById('haath-counter4').innerText = player4_collection.length/4;
    }
    can_pick = false;
    setTimeout(() => {
        clean_board();
        can_pick = true;
        if(player1_cards.filter(Object).length==0){
            restart_game();
            document.body.style.height = '100vh';
        }
    }, 4000);
}

function restart_game(){
    declare_winner();
    distribute.removeAttribute('disabled');
}

function declare_winner(){
    let p1collection = player1_collection.length;
    let p2collection = player2_collection.length;
    let p3collection = player3_collection.length;
    let p4collection = player4_collection.length;

    // console

    if(p1collection==p2collection && p2collection==p3collection && p3collection==p4collection && p4collection==0){
        flash('Game is not yet started', 4000);
        return
    }
    if(p1collection>=p2collection){
        if(p1collection==p2collection) flash('Tie between player 1 and 4', 4000); 
        else if(p1collection>p3collection){
            if(p1collection==p3collection) flash('Tie between player 1 and 3', 4000);
            if(p1collection==p4collection){ flash('Tie between player 1 and 4', 4000); return }
            else if(p1collection>p4collection){
                flash('player 1 is winner', 4000);
            }
            else{
                flash('player 4 is winner', 4000);
            }
        }
        else{
            if(p3collection>p4collection){
                flash('player 3 is winner', 4000);
            }
            else{
                flash('player 4 is winner', 4000);
            }
        }
    }
    else{
        if(p2collection>p3collection){
            if(p2collection>p4collection){
                flash('player 1 is winner', 4000);
            }
            else{
                flash('player 4 is winner', 4000);
            }
        }
        else{
            if(p3collection>p4collection){
                flash('player 3 is winner', 4000);
            }
            else{
                flash('player 4 is winner', 4000);
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
    
    document.getElementById('haath-counter1').innerText = 0;
    document.getElementById('haath-counter2').innerText = 0;
    document.getElementById('haath-counter3').innerText = 0;
    document.getElementById('haath-counter4').innerText = 0;

    document.body.style.height = '100vh';
}





