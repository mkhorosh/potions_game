import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Box } from '@mui/material';
import { ElementsStorage } from './components/game-table/ElementsStorage';
import { LeftBar } from './components/left-bar/LeftBar';
import { SideBar } from './components/side-bar/SideBar';
import { Link } from "react-router-dom";
import { StyledButton } from "../common/StyledButton";

import './GameSession.css';
import { Spinner } from '../common/Spinner';
import CardBack from "./card-back.png"
import A2 from "./A2.png"
import B3 from "./B3.png"
import C2 from "./C2.png"
import D4 from "./D4.png"
import E2 from "./E2.png"

let socket
const ENDPOINT = 'http://localhost:5000'

export const GameSession = () => {
    const [searchParams] = useSearchParams();
    let roomCode = searchParams.get('roomCode').slice(0, 5);
    let gameOptions = searchParams.get('roomCode').slice(14, 15);
    let gamePrivacy = true;

    const [currentUser, setCurrentUser] = useState(undefined);
    const [isStarted, setStart] = useState(false);
    const [users, setUsers] = useState([]);
    const [elementsStore, setElementsStore] = useState([]);
    const [usersHands, setUsersHands] = useState([]);
    const [scores, setScores] = useState({});
    const [turn, setTurn] = useState('')
    const [drawCardPile, setDrawCardPile] = useState([])
    const [winner, setWinner] = useState();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(15);

    useEffect(() => {
        const connectionOptions = {
            "forceNew": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            withCredentials: true,
            extraHeaders: {
                "authorization": `bearer ${JSON.parse(sessionStorage.getItem('user')).token}`
            }
        }
        socket = io.connect(ENDPOINT, connectionOptions);
        socket.emit('join', {
            room: roomCode, username: JSON.parse(sessionStorage.getItem('user')).username,
            options: gameOptions, privacy: gamePrivacy
        }, (error) => {
            if (error)
                console.log("error " + error);
        })
        return function cleanup() {
            socket.emit('disconnected');
            socket.off()
        }
    }, []);

    useEffect(() => {
        setCurrentUser(JSON.parse(sessionStorage.getItem('user')).username);
        socket.on("usersInRoom", (users) => {
            setUsers(users);
        })
        socket.on('updateGameState', (roomState) => {
            console.log(roomState);
            setStart(roomState.isGameStarted);
            setScores(roomState.gameState.scores);
            setUsersHands(roomState.gameState.playersDecks);
            setTurn(roomState.gameState.turn);
            setDrawCardPile(roomState.gameState.drawCardPile);
            setElementsStore(roomState.gameState.elementsStore);
            setSeconds(15);
        })
        socket.on('gameOver', winner => {
            setWinner(winner);
        })
        socket.on('message', message => {
            setMessages(messages => [...messages, message])

            const chatBody = document.querySelector('.chat-body')
            // chatBody.scrollTop = chatBody.scrollHeight
        })
    }, [])

    const onCardPlayedHandler = (played_card) => {
        console.log(played_card);
        socket.emit('playElement', { card: played_card, room: roomCode, username: currentUser  });
        // socket.emit('playRecipe', { card: played_card, room: roomCode, username: currentUser });
    }

    const onCardDrawnHandler = () => {
        socket.emit('drawCard', { room: roomCode, username: currentUser });
    }

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', { message: message, room: roomCode, username: currentUser }, () => {
                setMessage('')
            })
        }
    }

    if (winner) {
        return (
            <>
                <p>Победитель - {winner}</p>
                <Link to={`/menu`}><StyledButton variant="contained" sx={{ backgroundColor: "#FDEE71" }}>Сыграть ещё</StyledButton></Link>
            </>
        )
    }

    return (
        <>
            {(!isStarted) ?
                <>
                    <h1>Код игры: {roomCode}</h1>
                    <h1 className='topInfoText'>Ожидание подключения игроков.</h1>
                    <ul>
                        {users.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </> :

                <div className="wrapper">
                    <LeftBar messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage}
                        label={currentUser} myScore={scores[currentUser]}
                    />

                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Box sx={{ display: "flex", flexDirection: "column", }}>
                            <div className='player2Deck' style={{ pointerEvents: 'none' }}>
                                {users.map((item, i) => {
                                    if (item != currentUser) {
                                        return (
                                            usersHands[item]?.map((item, i) => (
                                                <img
                                                    alt="card"
                                                    key={i}
                                                    className='Card'
                                                    // onClick={() => onCardPlayedHandler(item)}
                                                    src={CardBack}
                                                />))
                                            //  turn === item && <Spinner /> 
                                        )
                                    }
                                })}


                            </div>

                            <ElementsStorage elements={elementsStore} />
                            <div className='player1Deck' style={turn === currentUser ? null : { pointerEvents: 'none' }}>
                                {usersHands[currentUser]?.map((item, i) => {
                                    if (item === "A2") {
                                        return (<img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={A2}
                                        />)
                                    } else if (item === "B3") {
                                        return (<img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={B3}
                                        />)
                                    } else if (item === "C2") {
                                        return (<img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={C2}
                                        />)
                                    } else if (item === "D4") {
                                        return (<img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={D4}
                                        />)
                                    } else if (item === "E2") {
                                        return (<img
                                            alt="card"
                                            key={i}
                                            className='Card'
                                            onClick={() => onCardPlayedHandler(item)}
                                            src={E2}
                                        />)
                                    } else {
                                        return null;
                                    }
                                })}


                            </div>
                        </Box>
                    </Box>

                    <SideBar seconds={seconds} setSeconds={setSeconds} room={roomCode} turn={turn} onCardDrawnHandler={onCardDrawnHandler} currentUser={currentUser} drawCardPile={drawCardPile} />
                </div>
            }
        </>
    )
}