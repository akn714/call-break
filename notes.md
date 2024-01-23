* game_id and player_id will be stored in cookies of every players browser
* player_id -> socket.id

* "chance" is a number, have to change it to player_id

* making a home page, consisting of 2 buttons
    * button 1: create a game / become host -> gets an unique id of game
    * button 2: join a game / join a room -> can join a game using unique id
* a game contains only 4 players

* adding 2 fields in card of cards array
    * 1: card: A, K, Q, J, 10, 9...
    * 2: card value: 14, 13, 12, 11, 10, 9...

* variable "c" tracks how many chances are happened
* variable "chance" tracks whose chance currently is, like now is player4's chance so "chance" will be equal to 4
    * if player2 played at first then: c=1, chance=2
    * then player3 will play: c=2, chance=3
    * then player4 will play: c=3, chance=4
    * then player1 will play: c=4, chance=1

* /join-a-game -> joining a game
* /game -> playing the game after joining
