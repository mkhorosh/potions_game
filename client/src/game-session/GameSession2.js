import React, { useEffect, useState } from 'react';
import './GameSession.css';
import { LeftBar } from './components/left-bar/LeftBar';
import { SideBar } from './components/side-bar/SideBar';
import { GameTable } from './components/game-table/GameTable';
import io from 'socket.io-client';
import { StyledButton } from '../common/style/StyledButton';
import { useParams, useSearchParams } from 'react-router-dom';
import { Spinner } from "../common/Spinner"
import { shuffleArray } from '../utilits/shuffleArray';
// import PACK_OF_CARDS from '../utilits/packOfCards'

import CardBack from "./card-back.png"
import { packOfCards } from '../utilits/packOfCards';
import { ElementsStorage } from './components/game-table/ElementsStorage';
import { Box } from '@mui/material';
import A2 from "./A2.png"
import B3 from "./B3.png"
import C2 from "./C2.png"
import D4 from "./D4.png"
import E2 from "./E2.png"

let socket
const ENDPOINT = 'http://localhost:5000'

export const GameSession2 = (props) => {
    // const data = queryString.parse(props.location.search)

    // const { roomCode } = queryString.parse(props.location.search);

    const [searchParams] = useSearchParams();
    let roomCode = searchParams.get('roomCode');
    console.log(searchParams.get('roomCode')); // 'name'

    //initialize socket state
    // const { roomId } = useParams();
    const [room, setRoom] = useState(roomCode);
    const [roomFull, setRoomFull] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const connectionOptions = {
            "forceNew": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        }
        socket = io.connect(ENDPOINT, connectionOptions)

        socket.emit('join', { room: room }, (error) => {
            if (error)
                setRoomFull(true)
        })

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('disconnected');
            // socket.disconnect();
            //shut down connnection instance
            socket.off()
        }
    }, [])

    //initialize game state
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')
    const [player1Deck, setPlayer1Deck] = useState([])
    const [player2Deck, setPlayer2Deck] = useState([])
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [elementsStore, setElementsStore] = useState([]);
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])

    // const [isChatBoxHidden, setChatBoxHidden] = useState(true)
    const [isUnoButtonPressed, setUnoButtonPressed] = useState(false)
    // const [isSoundMuted, setSoundMuted] = useState(false)
    // const [isMusicMuted, setMusicMuted] = useState(true)


    useEffect(() => {
        console.log("effect", player1Deck);
    }, [player1Deck])

    useEffect(() => {
        //shuffle PACK_OF_CARDS array
        const shuffledCards = shuffleArray(packOfCards)
        console.log("shuffledCards", shuffledCards);
        //extract first 4 elements to player1Deck
        const player1Deck = shuffledCards.splice(0, 4)

        //extract first 4 elements to player2Deck
        const player2Deck = shuffledCards.splice(0, 4)

        //extract random card from shuffledCards and check if its not an action card
        // let startingCardIndex
        // while (true) {
        //     startingCardIndex = Math.floor(Math.random() * 94)
        //     if (shuffledCards[startingCardIndex] === 'skipR' || shuffledCards[startingCardIndex] === '_R' || shuffledCards[startingCardIndex] === 'D2R' ||
        //         shuffledCards[startingCardIndex] === 'skipG' || shuffledCards[startingCardIndex] === '_G' || shuffledCards[startingCardIndex] === 'D2G' ||
        //         shuffledCards[startingCardIndex] === 'skipB' || shuffledCards[startingCardIndex] === '_B' || shuffledCards[startingCardIndex] === 'D2B' ||
        //         shuffledCards[startingCardIndex] === 'skipY' || shuffledCards[startingCardIndex] === '_Y' || shuffledCards[startingCardIndex] === 'D2Y' ||
        //         shuffledCards[startingCardIndex] === 'W' || shuffledCards[startingCardIndex] === 'D4W') {
        //         continue;
        //     }
        //     else
        //         break;
        // }

        //extract the card from that startingCardIndex into the playedCardsPile
        // const playedCardsPile = shuffledCards.splice(startingCardIndex, 1)

        //store all remaining cards into drawCardPile
        const drawCardPile = shuffledCards

        console.log("player1Deck", player1Deck);
        console.log("player2Deck", player2Deck);
        console.log("drawCardPile", drawCardPile);

        //send initial state to server
        socket.emit('initGameState', {
            gameOver: false,
            turn: 'Player 1',
            player1Deck: [...player1Deck],
            player2Deck: [...player2Deck],
            playedCardsPile: [...playedCardsPile],
            drawCardPile: [...drawCardPile],
            player1Score: 0,
            player2Score: 0,
            elementsStore: [...elementsStore]
        })
    }, [])

    useEffect(() => {
        socket.on('initGameState', ({ gameOver, turn, player1Deck, player2Deck, player1Score, player2Score, playedCardsPile, drawCardPile, elementsStore }) => {
            setGameOver(gameOver)
            setTurn(turn)
            setPlayer1Deck(player1Deck)
            setPlayer2Deck(player2Deck)
            setPlayer1Score(player1Score);
            setPlayer2Score(player2Score);
            setPlayedCardsPile(playedCardsPile)
            setDrawCardPile(drawCardPile)
            setElementsStore(elementsStore);
            console.log("on", player1Deck);
        })

        socket.on('updateGameState', ({ gameOver, winner, turn, player1Deck, player2Deck, player1Score, player2Score, playedCardsPile, drawCardPile, elementsStore }) => {
            gameOver && setGameOver(gameOver)
            // gameOver === true && playGameOverSound()
            winner && setWinner(winner)
            turn && setTurn(turn)
            player1Deck && setPlayer1Deck(player1Deck)
            player2Deck && setPlayer2Deck(player2Deck)
            player1Score && setPlayer1Score(player1Score);
            player2Score && setPlayer2Score(player2Score);
            playedCardsPile && setPlayedCardsPile(playedCardsPile)
            drawCardPile && setDrawCardPile(drawCardPile)
            elementsStore && setElementsStore(elementsStore);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })

        socket.on('currentUserData', ({ name }) => {
            setCurrentUser(name)
        })

        socket.on('message', message => {
            setMessages(messages => [...messages, message])

            const chatBody = document.querySelector('.chat-body')
            chatBody.scrollTop = chatBody.scrollHeight
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', { message: message }, () => {
                setMessage('')
            })
        }
    }

    const checkGameOver = (arr) => {
        return arr.length === 1
    }

    const checkWinner = (arr, player) => {
        return arr.length === 1 ? player : ''
    }

    const onCardPlayedHandler = (played_card) => {
        console.log("сыграть", played_card);
        //extract player who played the card
        const cardPlayedBy = turn
        console.log("играл", cardPlayedBy);
        if (cardPlayedBy === "Player 1") {

            if (played_card === "A2") {
                const element = "1";
                const points = 1;
                const recipe = ["5", "2"];
                const removeIndex = player1Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("5"), 1).splice(elementsStore.indexOf("2"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "B3") {
                const element = "2";
                const points = 1;
                const recipe = ["1", "5"];
                const removeIndex = player1Deck.indexOf(played_card)
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 3,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("1"), 1).splice(elementsStore.indexOf("5"), 1)]
                    })
                } else {
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "C2") {
                const element = "3";
                const points = 1;
                const recipe = ["1", "2"];
                const removeIndex = player1Deck.indexOf(played_card)
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("1"), 1).splice(elementsStore.indexOf("2"), 1)]
                    })
                } else {
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "D4") {
                const element = "4";
                const points = 1;
                const recipe = ["5", "3"];
                const removeIndex = player1Deck.indexOf(played_card)
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 4,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("5"), 1).splice(elementsStore.indexOf("3"), 1)]
                    })
                } else {
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "E2") {
                const element = "5";
                const points = 1;
                const recipe = ["3", "4"];
                const removeIndex = player1Deck.indexOf(played_card)
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("3"), 1).splice(elementsStore.indexOf("4"), 1)]
                    })
                } else {
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player1Deck),
                        winner: checkWinner(player1Deck, 'Player 1'),
                        turn: 'Player 2',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                        player1Score: player1Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            }
        } else {
            if (played_card === "A2") {
                const element = "1";
                const points = 1;
                const recipe = ["5", "2"];
                const removeIndex = player2Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("5"), 1).splice(elementsStore.indexOf("2"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "B3") {
                const element = "2";
                const points = 1;
                const recipe = ["1", "5"];
                const removeIndex = player2Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 3,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("1"), 1).splice(elementsStore.indexOf("5"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "C2") {
                const element = "3";
                const points = 1;
                const recipe = ["1", "2"];
                const removeIndex = player2Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("1"), 1).splice(elementsStore.indexOf("2"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "D4") {
                const element = "4";
                const points = 1;
                const recipe = ["5", "3"];
                const removeIndex = player2Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 4,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("5"), 1).splice(elementsStore.indexOf("3"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            } else if (played_card === "E2") {
                const element = "5";
                const points = 1;
                const recipe = ["3", "4"];
                const removeIndex = player2Deck.indexOf(played_card);
                console.log("сыграть");
                if (recipe.every(val => elementsStore.includes(val))) {
                    // points = 2;
                    console.log("emit1");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 2,
                        elementsStore: [...elementsStore.splice(elementsStore.indexOf("3"), 1).splice(elementsStore.indexOf("4"), 1)]
                    })
                } else {
                    console.log("emit2");
                    socket.emit('updateGameState', {
                        gameOver: checkGameOver(player2Deck),
                        winner: checkWinner(player2Deck, 'Player 2'),
                        turn: 'Player 1',
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                        player2Score: player2Score + 1,
                        elementsStore: [...elementsStore, element]
                    })
                }
            }
        }
    }

    const onCardDrawnHandler = () => {
        //extract player who drew the card
        const cardDrawnBy = turn
        //check who drew the card and return new state accordingly
        if (cardDrawnBy === 'Player 1') {
            //remove 1 new card from drawCardPile and add it to player1's deck (immutably)
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()


            // !isSoundMuted && playShufflingSound()
            //send new state to server
            socket.emit('updateGameState', {
                turn: 'Player 2',
                player1Deck: [...player1Deck.slice(0, player1Deck.length), drawCard, ...player1Deck.slice(player1Deck.length)],
                drawCardPile: [...copiedDrawCardPileArray]
            })

        }
        else {
            //remove 1 new card from drawCardPile and add it to player2's deck (immutably)
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card

            // !isSoundMuted && playShufflingSound()
            //send new state to server
            socket.emit('updateGameState', {
                turn: 'Player 1',
                player2Deck: [...player2Deck.slice(0, player2Deck.length), drawCard, ...player2Deck.slice(player2Deck.length)],
                drawCardPile: [...copiedDrawCardPileArray]
            })

        }
    }

    return (
        <div>

            {(!roomFull) ?
                <>


                {/* PLAYER LEFT MESSAGES */}
                {users.length === 1 && currentUser === 'Player 2' && <>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                        <h1>Код игры: {room}</h1>
                        <h1 className='topInfoText'>Игрок 1 вышел из игры.</h1>
                    </Box>

                    </>}
                    
                {users.length === 1 && currentUser === 'Player 1' && <>
                    <Box sx={{
                        display: "flex", alignItems: "center", flexDirection: 'column',
                         }}><h1>Код игры: {room}</h1>
                        <h1 className='topInfoText'>Ожидание подключения Игрока 2.</h1></Box>

                </>
                }

                {users.length === 2 && <>




                    <div className="wrapper">
                        <LeftBar messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage}
                            label={currentUser === 'Player 1' ? 'Player 1' : 'Player 2'}
                            player1Score={player1Score} player2Score={player2Score}
                        />




                        {/* PLAYER 1 VIEW */}
                        {currentUser === 'Player 1' && <Box sx={{ display: "flex", flexDirection: "column", }}>
                            <Box sx={{ display: "flex", flexDirection: "column", }}>
                                <div className='player2Deck' style={{ pointerEvents: 'none' }}>


                                    {player2Deck?.map((item, i) => (
                                        <img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={CardBack}
                                        />
                                    ))}
                                    {turn === 'Player 2' && <Spinner />}
                                </div>

                                <ElementsStorage elements={elementsStore} />
                                <div className='player1Deck' style={turn === 'Player 1' ? null : { pointerEvents: 'none' }}>

                                    {player1Deck?.map((item, i) => {
                                        console.log("item", item);
                                        if (item === "A2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={A2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "B3") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={B3}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "C2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={C2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "D4") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={D4}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "E2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={E2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        }
                                    })}
                                </div>
                            </Box>
                        </Box>}






                        {/* PLAYER 2 VIEW */}
                        {currentUser === 'Player 2' && <>
                            <Box sx={{ display: "flex", flexDirection: "column", }}>
                                <div className='player1Deck' style={{ pointerEvents: 'none' }}>

                                    {player1Deck?.map((item, i) => (
                                        <img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            // onClick={() => onCardPlayedHandler(item)}
                                            src={CardBack}
                                        />
                                    ))}
                                    {turn === 'Player 1' && <Spinner />}
                                </div>
                                <ElementsStorage elements={elementsStore} />
                                <div className='player2Deck' style={turn === 'Player 1' ? { pointerEvents: 'none' } : null}>

                                    {player2Deck?.map((item, i) => {
                                        console.log("item", item);
                                        if (item === "A2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={A2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "B3") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={B3}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "C2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={C2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "D4") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={D4}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        } else if (item === "E2") {
                                            return (<img
                                                alt="card"
                                                key={i}
                                                className='Card'
                                                onClick={() => onCardPlayedHandler(item)}
                                                src={E2}
                                            // {item === "A2" && src= { A2 }}
                                            // src={(item === A2 && A2) || (item === B3 && B3) || (item === C2 && C2) || (item === D4 && D4) || (item === E2 && E2)}
                                            />)
                                        }
                                    })}
                                </div>
                            </Box>
                        </>}






                        {/* <GameTable /> */}
                        <SideBar room={room} turn={turn} onCardDrawnHandler={onCardDrawnHandler} currentUser={currentUser} drawCardPile={drawCardPile} />
                    </div>



                </>}

                
                </>
                : <h1>Нельзя присоединиться к комнате</h1>}



        </div>
    );
}
