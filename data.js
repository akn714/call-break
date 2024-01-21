module.exports.Deck = [
    [{'image':'images/ace_of_spades.png', 'card':'S','value':'A','p':52},{'image':'images/king_of_spades2.png', 'card':'S','value':'K','p':51},{'image':'images/queen_of_spades2.png', 'card':'S','value':'Q','p':50},{'image':'images/jack_of_spades2.png', 'card':'S','value':'J','p':49},{'image':'images/10_of_spades.png', 'card':'S','value':'10','p':48},{'image':'images/9_of_spades.png', 'card':'S','value':'9','p':47},{'image':'images/8_of_spades.png', 'card':'S','value':'8','p':46},{'image':'images/7_of_spades.png', 'card':'S','value':'7','p':45},{'image':'images/6_of_spades.png', 'card':'S','value':'6','p':44},{'image':'images/5_of_spades.png', 'card':'S','value':'5','p':43},{'image':'images/4_of_spades.png', 'card':'S','value':'4','p':42},{'image':'images/3_of_spades.png', 'card':'S','value':'3','p':41},{'image':'images/2_of_spades.png', 'card':'S','value':'2','p':40}],
    [{'image':'images/ace_of_diamonds.png', 'card':'D','value':'A'},{'image':'images/king_of_diamonds2.png', 'card':'D','value':'K'},{'image':'images/queen_of_diamonds2.png', 'card':'D','value':'Q'},{'image':'images/jack_of_diamonds2.png', 'card':'D','value':'J'},{'image':'images/10_of_diamonds.png', 'card':'D','value':'10'},{'image':'images/9_of_diamonds.png', 'card':'D','value':'9'},{'image':'images/8_of_diamonds.png', 'card':'D','value':'8'},{'image':'images/7_of_diamonds.png', 'card':'D','value':'7'},{'image':'images/6_of_diamonds.png', 'card':'D','value':'6'},{'image':'images/5_of_diamonds.png', 'card':'D','value':'5'},{'image':'images/4_of_diamonds.png', 'card':'D','value':'4'},{'image':'images/3_of_diamonds.png', 'card':'D','value':'3'},{'image':'images/2_of_diamonds.png', 'card':'D','value':'2'}],
    [{'image':'images/ace_of_hearts.png', 'card':'H','value':'A'},{'image':'images/king_of_hearts2.png', 'card':'H','value':'K'},{'image':'images/queen_of_hearts2.png', 'card':'H','value':'Q'},{'image':'images/jack_of_hearts2.png', 'card':'H','value':'J'},{'image':'images/10_of_hearts.png', 'card':'H','value':'10'},{'image':'images/9_of_hearts.png', 'card':'H','value':'9'},{'image':'images/8_of_hearts.png', 'card':'H','value':'8'},{'image':'images/7_of_hearts.png', 'card':'H','value':'7'},{'image':'images/6_of_hearts.png', 'card':'H','value':'6'},{'image':'images/5_of_hearts.png', 'card':'H','value':'5'},{'image':'images/4_of_hearts.png', 'card':'H','value':'4'},{'image':'images/3_of_hearts.png', 'card':'H','value':'3'},{'image':'images/2_of_hearts.png', 'card':'H','value':'2'}],
    [{'image':'images/ace_of_clubs.png', 'card':'C','value':'A'},{'image':'images/king_of_clubs2.png', 'card':'C','value':'K'},{'image':'images/queen_of_clubs2.png', 'card':'C','value':'Q'},{'image':'images/jack_of_clubs2.png', 'card':'C','value':'J'},{'image':'images/10_of_clubs.png', 'card':'C','value':'10'},{'image':'images/9_of_clubs.png', 'card':'C','value':'9'},{'image':'images/8_of_clubs.png', 'card':'C','value':'8'},{'image':'images/7_of_clubs.png', 'card':'C','value':'7'},{'image':'images/6_of_clubs.png', 'card':'C','value':'6'},{'image':'images/5_of_clubs.png', 'card':'C','value':'5'},{'image':'images/4_of_clubs.png', 'card':'C','value':'4'},{'image':'images/3_of_clubs.png', 'card':'C','value':'3'},{'image':'images/2_of_clubs.png', 'card':'C','value':'2'}]
]


// let Games = {
//     'game name': {
//          'user name1' : {},
//          'user name2' : {},
//          'user name3' : {},
//          'user name4' : {}
//     },
//     'game id': {
//          'player id1': {},
//          'player id2': {},
//          'player id3': {},
//          'player id4': {}
//    }
// }

module.exports.Games = {

}

module.exports.player_template = {
    'name': '',
    'cards': [],
    'collection': [],
    'chance_number': 0
}

module.exports.game_template = {
    'players':{
        // player_id = socket.id

        // 'player_id':{
        //     'name': 'name of player',
        //     'cards': [],
        //     'collection': [],
        //     'chance_number': 0   // can be 0, 1, 2, 3
        // }
    },
    'available_cards': [],
    'already_distributed': [],
    'board': [],
    'used_cards': [],
    'cards_on_board': [],
    'chaal': null,
    'chance':0,
    'c': 0,
    'greatest_card_on_board': 0
}
