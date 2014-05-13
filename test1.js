
/////////////////////////////////
// shuffle from stack overflow //
/////////////////////////////////

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
		case 0:  return 'Hearts'	;
		case 1:  return 'Diamonds'	;
		case 2:  return 'Spades'	;
		default: return 'Clubs'		;
	}
}
function number_to_value(number){
	if (number < 11) return number;
	switch (number){
		case 11: return 'Jack'	;
		case 12: return 'Queen'	;
		case 13: return 'King'	;
		default: return 'Ace'	;
	}
}

///////////////
// Card type //
///////////////

function card_type(suit, number){
	// functions
	this.print = function(){
		console.log(number_to_value(number) + ' of ' + this.suit);
	}
	// initialization
	this.suit		= conv_suitInt_toChar(suit);
	this.number 	= number;
}

///////////////
// Deck Type //
///////////////

function deck_type(){
	// functions
	this.shuffle = function(){
		shuffle(this.cards);
		this.current_card = 0;
	}
	this.deal = function(hand){
		hand.push(this.cards[this.current_card++])
	}
	// initialization
	this.cards = []
	for 	(var suit 	= 0; suit 	< 4;	suit++) 
		for (var num 	= 2; num 	< 15; 	num++ ) 
			this.cards.push(new card_type(suit, num));

	shuffle(this.cards);
	this.current_card 	= 0;
}

///////////////
// Hand Data //
///////////////

function hand_data(){
	this.hand = [];

	this.deal = function(deck){
		deck.deal(this.hand);
	}

	this.getScore = function(start){
		var score = 0;
		var numAces = 0;
		// Calculate non-ace score and number of aces
		for (var i = start; i < this.hand.length; i++) {
			var curVal = number_to_value(this.hand[i].number);

			if (this.hand[i].number <= 10)		score += this.hand[i].number;
			else if (this.hand[i].number < 14)	score += 10;
			else 								numAces++;
		};
		// Calculate aces score
		for (; numAces > 0; numAces--){
			if (score + 10 + (numAces - 1) * 1 < 22)
					score += 10;
			else 	score += 1;
		};
		return score;
	}

	this.printHand = function(start){
		for (var i = start; i < this.hand.length; i++)
			this.hand[i].print();
	}
}

/////////////////
// Player Type //
/////////////////

function player_type(name, deck){
	// functions
	this.print = function(){		// prints all cards
		console.log(this.name, this.message)
		this.data.printHand(0)
	}

	this.printDealer = function(){	// prints all but first card
		console.log(this.name, this.message)
		this.data.printHand(1)
	}

	this.printScore = function(start){
		console.log(this.name,
			' has the following score: ',
			this.data.getScore(start));
	}

	this.deal = function(deck){
		this.data.deal(deck);
	}

	this.score = function(){
		return this.data.getScore(0);
	}

	this.autoplay = function(deck){
		while(this.score() < 15){
			this.deal(deck);
			console.log(this.name, ' hits');
			this.print();
		}
		if (this.score() < 22)
			console.log(this.name, ' stays at ', this.score());
		else
			console.log(this.name, ' busts')
	}


	// initialization
	this.name = name;
	this.data = new hand_data;
	this.message = ' has the following cards:';

	this.deal(deck);
	this.deal(deck);
}

///////////////////
// Game Function //
///////////////////

var playgame = function playgameF(){
	var deck   		= new deck_type;
	var user   		= new player_type('user',	deck);
	var dealer 		= new player_type('dealer',	deck);

	var userdone	= false;
	var dealerdone	= false;

	dealer.printDealer();
	user.print();
	user.printScore(0);

	// autoplay functionality
	user.autoplay(deck);	// removing this will allow a user to play
	dealer.autoplay(deck);

	if ((user.score() > dealer.score()
		|| dealer.score() > 21)
		&& user.score() < 22)
		console.log('user wins!');
	else if (dealer.score() < 22)
		console.log('dealer wins!');
	else
		console.log('you all suck');
}


////////////////////
// Function calls //
////////////////////

playgame();
