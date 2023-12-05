// cards -> SPADE (S), DIMAND (D), HEART (H), CLUB (C)

let deck = [
    [{'S':'A'},{'S':'K'},{'S':'Q'},{'S':'J'},{'S':'10'},{'S':'9'},{'S':'8'},{'S':'7'},{'S':'6'},{'S':'5'},{'S':'4'},{'S':'3'},{'S':'2'}],
    [{'D':'A'},{'D':'K'},{'D':'Q'},{'D':'J'},{'D':'10'},{'D':'9'},{'D':'8'},{'D':'7'},{'D':'6'},{'D':'5'},{'D':'4'},{'D':'3'},{'D':'2'}],
    [{'H':'A'},{'H':'K'},{'H':'Q'},{'H':'J'},{'H':'10'},{'H':'9'},{'H':'8'},{'H':'7'},{'H':'6'},{'H':'5'},{'H':'4'},{'H':'3'},{'H':'2'}],
    [{'C':'A'},{'C':'K'},{'C':'Q'},{'C':'J'},{'C':'10'},{'C':'9'},{'C':'8'},{'C':'7'},{'C':'6'},{'C':'5'},{'C':'4'},{'C':'3'},{'C':'2'}]
]


let player1 = []
let player2 = []
let player3 = []
let player4 = []

let available_cards = []
let already_distributed = []

function copy_to_cards(){
    for(let i=0;i<4;i++){
        for(let j=0;j<13;j++){
            available_cards.push(deck[i][j]);
        }
    }
}

function distribute_cards(){
    for(let i=0;i<13;i++){
        player1.push(get_random_card());
        player2.push(get_random_card());
        player3.push(get_random_card());
        player4.push(get_random_card());
    }
}


function get_random_card(){
    let random = Math.floor(Math.random()*available_cards.length);
    let card = available_cards[random];

    delete available_cards[random];
    available_cards = available_cards.filter(Object);
    already_distributed.push(card);
    return card;
}




