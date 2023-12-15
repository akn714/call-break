# call-break
This is a cards game called call-break.

### Todo
* done: Making card disappear after using
* done: Playing player chance wise
* Displaying cards of players on there individual devices
* done: changing colors of cards
* done: pausing the board before cleaning the board
* done: disabling distribute cards button after distributing cards
* flashing message instead of alert
* done: adding cards images

### bugs
* fixed: distribute button not disabling
* fixed (not sure): player_include() throwing error when card is not available in player cards
* fixed (not sure): game tie
* bug:
    * player 1: 2 of heart
    * player 2: 7 of spade, 'cause it doesn't have heart
    * player 3: 7 of heart
    * player 4: can't use 3 of heart, 'cause it has 9 of heart which is greater than 7 of heart, but it should be able to use 3 of heart as player 2 will pick the card

### Todo (server)
* adding game_id and player_id in req object in middleware