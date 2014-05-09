// shuffle from stack overflow
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex 	 	= Math.floor(Math.random() * currentIndex);
    currentIndex 		-= 1;

    // And swap it with the current element.
    temporaryValue 		= array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] 	= temporaryValue;
  }

  return array;
}

//////////////////////////
// Conversion functions //
//////////////////////////

function conv_suitInt_toChar(suit){
	switch (suit){
		case 0:  return 'Hearts'
		case 1:  return 'Diamonds'
		case 2:  return 'Spades'
		default: return 'Clubs'
	}
}
function number_to_value(number){
	if (number < 11) return number;
	switch (number){
		case 11: return 'Jack'
		case 12: return 'Queen'
		case 13: return 'King'
		default: return 'Ace'
	}
}

///////////////
// Card type //
///////////////

function card_type(suit, number){
	this.suit		= conv_suitInt_toChar(suit)
	this.value 		= number_to_value(number)
}
card_type.prototype.print = function(){
	console.log(this.value + ' of ' + this.suit)
}

///////////////
// Deck Type //
///////////////

function deck_type(){
	this.cards = []
	for 	(var suit 	= 0; suit 	< 4;	suit++) 
		for (var num 	= 2; num 	< 15; 	num++ ) 
			this.cards.push(new card_type(suit, num))

	shuffle(this.cards)
	this.current_card 	= 0
}
deck_type.prototype.shuffle = function(){
	shuffle(this.cards)
	this.current_card = 0
}
deck_type.prototype.deal = function(hand){
	hand.push(this.cards[this.current_card++])
}

///////////////
// Hand Data //
///////////////

function hand_data(){
	this.hand = []
}
hand_data.prototype.deal = function(deck) {
	deck.deal(this.hand)
};
hand_data.prototype.printHand = function(start) {
	for (var i = start; i < this.hand.length; i++) {
		this.hand[i].print()
	};
};

/////////////////
// Player Type //
/////////////////

function player_type(name){
	this.name = name
	this.data = new hand_data
}
player_type.prototype.start = function(deck) {
	this.data.deal(deck)
	this.data.deal(deck)
};
player_type.prototype.print = function() {
	console.log(this.name, ' has the following cards')
	this.data.printHand(0)
};
player_type.prototype.printDealer = function() {
	console.log(this.name, ' has the following cards')
	this.data.printHand(1)
};

///////////////////
// Game Function //
///////////////////

var playgame = function playgameF(){
	var deck   		= new deck_type
	var user   		= new player_type('user')
	var dealer 		= new player_type('dealer')

	var userdone	= false
	var dealerdone	= false

	user.start(deck)
	dealer.start(deck)

	dealer.printDealer()
	user.print()
}


////////////////////
// Function calls //
////////////////////

playgame()
