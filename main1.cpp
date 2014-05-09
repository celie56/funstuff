#include <iostream>
#include <algorithm>
#include <ctime>
#include <cstdlib>
#include <string>
#include <vector>
using namespace std;

// This is a little testing program to get used to the visual studio cl
// compiler and otherwise get used to the development area

class settings_type{
private:
	bool textonly;
public:
	settings_type(){

	}

};



//				Comment Area :)
//
//
//
//
//
//
//



enum suit_type {
	HEART,
	SPADE,
	DIAMOND,
	CLUB
};

suit_type int_to_suit(short s){
	switch (s){
		case 0: return HEART;
		case 1:	return SPADE;
		case 2:	return DIAMOND;
		default:return CLUB;
	}
}

string suit_to_string(suit_type s){
	switch (s){
		case 0: return "Hearts";
		case 1: return "Spades";
		case 2: return "Daimonds";
		default:return "Clubs";
	}
}

char suit_to_char(suit_type s){
	switch (s){
		case 0: return 'H';
		case 1: return 'S';
		case 2: return 'D';
		default:return 'C';
	}
}

string Parse_Cardnum(short s){
	if (s < 11) return to_string(s);
	switch (s){
		case 11: return "Jack";
		case 12: return "Queen";
		case 13: return "King";
		default: return "Ace";
	}
}

string Parse_Cardnum_Letter(short s){
	if (s < 11) return to_string(s);
	switch (s){
		case 11: return "J";
		case 12: return "Q";
		case 13: return "K";
		default: return "A";
	}
}


/**
 * 	Card class
 */
class card_type {
private:
	suit_type suit;
	short num;
public:
	card_type(suit_type s, short n){
		suit = s;
		num = n;
	}
	
	void card_type::pCard(){
		cout << Parse_Cardnum(num) << " of " << suit_to_string(suit) << '\n';
	}

	suit_type card_type::gSuit(){ return suit; }
	short card_type::gNum(){
		if (num < 10) return num;
		else return 10; // face cards = 10
	}
	bool card_type::isAce(){ // aces are tricky
		if (num == 14) return true;
		return false;
	}
	string card_type::snum(){ return Parse_Cardnum_Letter(num); }
	char card_type::csuit(){ return suit_to_char(suit); }
};



//				Comment Area :)
//
//		
//
//
//
//
//


class deck_type {
private:
	vector<card_type> cards;
	short current_card;
public:
	deck_type(){
		for (short s = 0; s < 4; ++s){ 		// suit
			for (short n = 2; n < 15; ++n){	// card num
				cards.push_back(card_type(int_to_suit(s), n));
			}
		}
		shuffle();
	}

	card_type* deck_type::gCard(short i){
		return &cards[i];
	}

	card_type* deck_type::deal(){
		if (current_card == 53) shuffle();
		return &cards[current_card++];
	}

	void deck_type::shuffle(){
		random_shuffle(cards.begin(), cards.end());
		current_card = 0;
	}
};


//				Comment Area :)
//
//
//
//
//
//
//


void drawcards(vector<card_type*>& cards){
	int numCards = cards.size();
	if (numCards > 5) numCards = 5;
	for (int i = 0; i < numCards; ++i)
		cout << " --  ";
	cout << '\n';
	for (int i = 0; i < numCards; ++i)
		cout << "| " << cards[i]->csuit() << "| ";
	cout << '\n';
	for (int i = 0; i < numCards; ++i)
		if (cards[i]->snum() != "10")
			cout << "|" << cards[i]->snum() << " | ";
		else
			cout << "|" << cards[i]->snum() << "| ";			
	cout << '\n';
	for (int i = 0; i < numCards; ++i)
		cout << " --  ";
	cout << '\n';
}



//				Comment Area :)
//
//
//
//
//
//
//



class player_type{
protected:
	vector<card_type*> hand;
	deck_type* deck;
	player_type(){}
public:
	short player_type::gScore(){
		short score = 0;
		short numAces = 0;
		for (auto c : hand){
			if (!c->isAce()) score += c->gNum();
			else ++numAces;
		}
		for (; numAces > 0; --numAces){
			if (score < 12) score +=10;
			else score += 1;
		}
		return score;
	}
	void player_type::hit(){
		hand.push_back(deck->deal());
	}
	bool player_type::isBust(){
		return (gScore() > 21);
	}
};

class bjuser : public player_type{
public:
	bjuser(deck_type* d){
		deck = d;
		hit(); hit();
	}

	void bjuser::pHand(){
		cout << "Your score: " << gScore() << '\n';
		cout << "You have in your hand:\n";
		drawcards(hand);
		for (auto c : hand)
			c->pCard();
	}
};

class bjdealer : public player_type{
private:
	short bjdealer::dScore(short s){
		if (!hand[0]->isAce()) return s - hand[0]->gNum();
		return s - 10;
	}
public:
	bjdealer(deck_type* d){
		deck = d;
		hit(); hit();
	}

	void bjdealer::pHand(){
		cout << "Dealer score: " << dScore(gScore()) << '\n';
		cout << "The dealer is showing:\n";
		for (unsigned int c = 1; c < hand.size(); ++c)
			hand[c]->pCard();
		cout << '\n';
	}
	void bjdealer::play(short s){
		while (gScore() < 17 || gScore() < s) hit();
	}
};


//				Comment Area :)
//
//
//
//
//
//
//


bool selectOption(player_type* p){
	string input;
	cout << "\nWhat would you like to do? (to hit, type hit or h)\n";
	cin >> input;
	if (input == "hit" || input == "h"){
		p->hit();
		return false;
	}
	return true;
}

void printEnd(player_type* u, player_type*d){
	short uScore = u->gScore();
	short dScore = d->gScore();
	cout << "\nuser: " << uScore << '\n'
		 << "dealer: " << dScore << '\n';
	if (dScore >= uScore && dScore < 22)
		cout << "The dealer wins with a score of " << dScore << endl;
	else
		cout << "The user wins with a score of " << uScore << endl;
}

void BlackJack(){
	deck_type deck;
	bjuser user(&deck);
	bjdealer dealer(&deck);

	do{
		dealer.pHand();
		user.pHand();
		if (user.isBust()) break;
	} while (!selectOption(&user));
	if (!user.isBust()){
		dealer.play(user.gScore());
		printEnd(&user, &dealer);
	}
	else
		cout << "You busted, you lose" << endl;
}


//				Comment Area :)
//
//
//
//
//
//
//


string qInput(){string i; cin >> i; cout << '\n'; return i;} // quick input

bool checkDone(){
	cout << "\nAre you done?\n";
	string input = qInput();
	if (input == "yes" || input == "y") return true;
	return false;
}

string selectGame(){
	cout << "What would you like to play?\n"
		 << "1) BlackJack\n"
		 << "That's it so far...\n";
	return qInput();
}

void playGame(void (*f)()){
	do{
		(*f)();
	} while (!checkDone());
}

void GameMenu(){
	string choice = "";
	while (true) {
		choice = selectGame();
		if (choice == "1" || choice == "BlackJack")
			playGame(BlackJack);
		// else if (choice == "draw" || choice == "2")
		// 	drawcard(1,'c');
		else break;
	}
}

int main(){
	srand (unsigned (time(0)));			// get that random stuff goin'

	cout << "hello world\nokay, now that we have that...\nwho are you? ";
	string input = qInput();
	if (input == "chris")
		GameMenu();
	else
		cout << "yeah okay... " << input << '\n';
	return 0;
}

// and yes, it is silly 


//				Comment Area :)
//
//
//
//
//
//
//
