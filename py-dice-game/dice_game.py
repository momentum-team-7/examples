import random

def start_game():
    '''Obtain the three players' names and create
    a die. Return the players and the die'''
    # these are list comprehensions, which can contain conditionals
    players = [input("What is the player's name? ") for i in range(3)]
    # since range() does not include the ending number, we add 1
    die = [i for i in range(1, int(input("How many sides does your die have? ")) + 1)]
    # this is a tuple
    return players, die

def play_game():
    '''Game continues with turns until one player wins'''

    # it's called "unpacking" a tuple, when you assign a variabe
    # to each value from the tuple
    players, die = start_game()
    # you can also do dictionary comprehensions
    # create a dict for keeping score
    scores = { name: 0 for name in players}
    # as long as no player has 100 pts, keep playing
    while not any(score >= 100 for name, score in scores.items()):
        winner, points = roll(die, players)
        # add the points scored by the winner of the round to their score
        scores[winner] += points
   #end game and print the final scores 
    print(f"final scores: {scores}")
  
    
# since we want to repeat this action, we'll make it
# a spearate function
def roll(die, players):
    # roll the die once for each player and store the result as a list of tuples
    round = [(player, random.choice(die)) for player in players]
    for name, score in round:
        print(f"{name} rolled a {score}")
    # find the tuple corresponding to the highest roll
    winning_roll = max(round, key = lambda i : i[1])
    print(f'{winning_roll[0]} wins the round with a {winning_roll[1]}')
    return winning_roll





        

    

play_game()

