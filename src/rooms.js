const { shuffleArray } = require('./utils');

rooms = {
    "u8u34": {
        users: [],
        roomSize: 2
    }
};
let timerId = null;
const TURN_TIME = 15000;

const serverTimer = (room, username, getIOInstance) => {
    console.log("timer", username);
    drawCard(room, username, getIOInstance);
    getIOInstance().to(room).emit('updateGameState', getRoomState(room));
    if (isGameOver(room)) {
        getIOInstance().to(room).emit('gameOver', getWinner(room));
    }
}

const createRoom = (roomId, gameOptions, gamePrivacy) => {
    rooms[roomId] = {
        users: [],
        roomSize: gameOptions,
        isGameStarted: false,
        isPrivate: gamePrivacy,
        gameState: {
            gameOver: false,
            turn: undefined,
            playersDecks: {},
            playedCardsPile: [],
            drawCardPile: [],
            scores: {},
            elementsStore: []
        }
    };
};

const startGame = (roomId, getIOInstance) => {
    const packOfCards = [
        'A2', 'A2', 'A2', 'B3', 'B3', 'B3',
        'C2', 'C2', 'D4', 'D4', 'E2', 'E2',
        // 'C2', 'C2', 'D4', 'D4', 'E2', 'E2'
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
    timerId = setTimeout(serverTimer, TURN_TIME, roomId, initUser, getIOInstance );
}

const getRoom = (roomId) => {
    return rooms.hasOwnProperty(roomId);
}

const getRoomState = (roomId) => {
    return rooms[roomId];
}

const addUser2Room = (roomId, username) => {
    rooms[roomId].users.push(username);
}

const getUsersInRoom = roomId => {
    return rooms[roomId].users;
}

const isRoomFull = (roomId) => {
    return rooms[roomId].users.length == rooms[roomId].roomSize;
}

const drawCard = (roomId, username, getIOInstance) => {
    clearTimeout(timerId);
    rooms[roomId].gameState.playersDecks[username].push(rooms[roomId].gameState.drawCardPile.pop());
    let nextPl = rooms[roomId].users.indexOf(rooms[roomId].gameState.turn) + 1;
    if (nextPl > rooms[roomId].users.length - 1) {
        nextPl -= rooms[roomId].roomSize;
    }
    const nextUser = rooms[roomId].users[nextPl];
    rooms[roomId].gameState.turn = nextUser;   
    timerId = setTimeout(serverTimer, TURN_TIME, roomId, nextUser, getIOInstance);
}

const isGameOver = (roomId) => {
    if (rooms[roomId].gameState.drawCardPile.length === 0) {
        rooms[roomId].gameState.gameOver = true;
        return true;
    }
}

const isGameStarted = (roomId) => {
    if (rooms[roomId].isGameStarted) {
        return true;
    }
    return false;
}

const getWinner = (roomId) => {
    if (isGameOver(roomId)) {
        let winner = undefined;
        let winnerScore = -1;
        for (let [key, value] of Object.entries(rooms[roomId].gameState.scores)) {
            if (!winner || value > winnerScore) {
                winner = key;
                winnerScore = value;
            }
        }
        return winner;
    }
}

const playElement = (roomId, username, card, getIOInstance) => {
    clearTimeout(timerId);
    let index = rooms[roomId].gameState.playersDecks[username].indexOf(card);
    if (index !== -1) {
        rooms[roomId].gameState.playersDecks[username].splice(index, 1);
        rooms[roomId].gameState.scores[username]++;
        let newElem = undefined;
        if (card === "A2") {
            newElem = "fire";
        } else if (card === "B3") {
            newElem = "water";
        } else if (card === "C2") {
            newElem = "herb1";
        } else if (card === "D4") {
            newElem = "bat";
        } else if (card === "E2") {
            newElem = "herb2";
        }
        if (newElem) {
            rooms[roomId].gameState.elementsStore.push(newElem);
        }
        let nextPl = rooms[roomId].users.indexOf(rooms[roomId].gameState.turn) + 1;
        if (nextPl > rooms[roomId].users.length - 1) {
            nextPl -= rooms[roomId].roomSize;
        }
        const nextUser = rooms[roomId].users[nextPl];
        rooms[roomId].gameState.turn = nextUser;
        timerId = setTimeout(serverTimer, TURN_TIME, roomId, nextUser, getIOInstance);
    }

}

const playRecipe = (roomId, username, card, getIOInstance) => {
    clearTimeout(timerId);
    let index = rooms[roomId].gameState.playersDecks[username].indexOf(card);
    if (index !== -1) {
        rooms[roomId].gameState.playersDecks[username].splice(index, 1);
        let nextPl = rooms[roomId].users.indexOf(rooms[roomId].gameState.turn) + 1;
        if (nextPl > rooms[roomId].users.length - 1) {
            nextPl -= rooms[roomId].roomSize;
        }
        const nextUser = rooms[roomId].users[nextPl];
        rooms[roomId].gameState.turn = nextUser;
        timerId = setTimeout(serverTimer, TURN_TIME, roomId, nextUser, getIOInstance);
    }
}



module.exports = {
    createRoom, getRoom, addUser2Room, getUsersInRoom, isRoomFull, startGame, getRoomState,
    drawCard, isGameOver, isGameStarted, getWinner, playElement, playRecipe
};
