import random

RANKS = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
SUITS = ['♠️', '♣️', '♥️', '♦️']


class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit

    def __str__(self):
        return f'{self.rank} of {self.suit}'


class Deck:
    def __init__(self, ranks, suits):
        ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
        suits = ['♠️', '♣️', '♥️', '♦️']
        self.cards = []
        for rank in ranks:
            for suit in suits:
                card = Card(rank, suit)
                self.cards.append(card) 

    #DONE method to shuffle the deck
    # takes self and returns self with self.cards rearranged randomly
    def shuffle_deck(self):
        random.shuffle(self.cards)
        # return self.cards

    # DONE method to deal the top card of the deck to a player
    # takes a player and a deck and adds the top card from the deck to a player's hand
    def deal_card(self):
        card_draw = self.cards.pop()
        return card_draw

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def __str__(self):
        return f'{self.name} has a hand of {[str(card) for card in self.hand]}'

    def select_card(self):
        ranks_in_hand = self.get_ranks_in_hand()
        selected_card = random.choice(ranks_in_hand)
        print(f'{self.name} requests {selected_card}')
        return selected_card
        
    def get_ranks_in_hand(self):
        return [card.rank for card in self.hand]

class Game:
    def __init__(self, ranks, suits, name1, name2):
        self.deck = Deck(ranks, suits)
        self.deck.shuffle_deck()
        self.player1 = Player(name1)
        self.player2 = Player(name2)
        self.winner = None
        self.deal_hands()

    # DONE use deal_card() method from Deck class to deal 7 cards to each player
    def deal_hands(self):
        players = [self.player1, self.player2]
        for i in range(7):
            for player in players:
                player.hand.append(self.deck.deal_card())
        print(len(self.deck.cards))

    # TODO create turn action in which player asks for a card and goes fish according to the rules
    # Determine if the turn was a winning/losing turn or if the game should keep going
    def turn(self, requester, receiver):
        # player checks their hand of cards
        # player asks other player about 1 card
        # player 2 either loses cards or keeps cards
        # if 'Go Fish' player1 draws a card
        # TODO if player has no cards in hand, player draws one from deck.
        selected_card_rank = requester.select_card()
        print(f'{requester.name} says, "Got any {selected_card_rank}s? ')
        if selected_card_rank in receiver.get_ranks_in_hand():
            print(f'{receiver.name} says, "Here you go."')
            for index, card in enumerate(receiver.get_ranks_in_hand()):
                if selected_card_rank == card:
                    requester.hand.append(receiver.hand[index])
            receiver.hand = [card for card in receiver.hand if card.rank != selected_card_rank]
            # TODO have player put down "books" of 4 cards
            print(f'{requester} | {receiver}')
            self.turn(requester, receiver)
    
        else:
            print(f'{receiver.name} says, "Go fish!"')
            drawn_card = self.deck.deal_card()
            print(f'{requester.name} drew a {drawn_card}')
            requester.hand.append(drawn_card)
            if drawn_card.rank == selected_card_rank:
                 # TODO have player put down "books" of 4 cards
                self.turn(requester, receiver)
            else: 
                print(f'{requester} | {receiver}')
                print("Your turn is over")
                return

                
# TODO allow user to input player names                               
game = Game(RANKS, SUITS, 'Rebecca', 'Grant')
# This depicts one turn. 
# TODO create a loop where players take turns ubntil the game is over
# game ends when all books have been put down(13), so no cards in the deck or the hands
# winner of the game is person with the most books.
game.turn(game.player1, game.player2)
game.turn(game.player2, game.player1)

print('game over')


    



    


    
                
