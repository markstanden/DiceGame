const cards = {
    deck: [],
    drawnStack: [],

    emptyDeck() {
        this.deck = [];
        this.drawnStack = [];
    },

    makeDeck(
        suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'],
        values = 'A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',')
    ) {
        for (suit of suits) {
            for (value of values) {
                this.deck.push({ value, suit });
            }
        }
        console.log(this.deck);
    },

    swapCards(i, j) {
        [deck[i], deck[j]] = [deck[j], deck[i]];
    },

    shuffleDeck(deck = this.deck) {
        // for loop with starting value at the index of the last item of the array (length-1)
        // working backwards until the second to last item (i>0)
        for (let i = deck.length - 1; i > 0; i--) {
            // choose a random number between 0 and i (including i itself)
            // so not including any of the previously swapped cards
            let j = Math.floor(Math.random() * (i + 1));
            //swap the cards, this seems magical.
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    },

    drawCards(number = 1) {
        const drawnCards = [];
        for (i = 0; i < number; i++) {
            drawnCards[i] = this.deck.pop();
            this.drawnStack.push(drawnCards[i]);
        }
        return drawnCards;
    }
};

cards.makeDeck();
cards.shuffleDeck();
console.log(cards.deck);
