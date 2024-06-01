/* eslint-disable jest/valid-describe-callback */
/* eslint-disable no-undef */

describe('testStartGameInRoom', (roomId) => {
    test('начинает игру', () => {
        const packOfCards = [
            'A2', 'A2', 'A2', 'B3', 'B3', 'B3',
            'C2', 'C2', 'D4', 'D4', 'E2', 'E2',
        ]
        const shuffledCards = shuffleArray(packOfCards);
        rooms[roomId].isGameStarted = true;
        for (const user of rooms[roomId].users) {
            rooms[roomId].gameState.playersDecks[user] = shuffledCards.splice(0, 4);
            rooms[roomId].gameState.scores[user] = 0;
        }
        rooms[roomId].gameState.drawCardPile = shuffledCards;
        const initUser = rooms[roomId].users[(Math.floor(Math.random() * rooms[roomId].users.length))];
        rooms[roomId].gameState.turn = initUser;

        expect(rooms[roomId].isGameStarted).toEqual(true);
        expect(shuffledCards.length).toEqual(packOfCards.length - rooms[roomId].users.length * 4);
    });
});