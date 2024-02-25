import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import { StyledButton } from '../common/style/StyledButton';

let socket
const ENDPOINT = 'http://localhost:5000'

export const GameSession = (props) => {

    const [searchParams] = useSearchParams();
    let roomCode = searchParams.get('roomCode');
    const [roomFull, setRoomFull] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleStartGame = () => {
        setRoomFull(true);
    }

    useEffect(() => {
        const connectionOptions = {
            "forceNew": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            // "transports": ["websocket"],

            withCredentials: true,
            extraHeaders: {
                "authorization": `bearer ${JSON.parse(sessionStorage.getItem('user')).token}`
            }
        }
        socket = io.connect(ENDPOINT, connectionOptions);
        socket.emit('join', { room: roomCode, username: JSON.parse(sessionStorage.getItem('user')).username }, (error) => {
            if (error)
                console.log("error " + error);
        })
        //cleanup on component unmount
        return function cleanup() {
            socket.emit('disconnected');
            //shut down connnection instance
            socket.off()
        }
    }, []);

    useEffect(() => {
        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })
    }, [])

    return (
        <>

            {(!roomFull) ?
                <>
                    <p>game session</p>
                    <h1>Код игры: {roomCode}</h1>
                    <h1 className='topInfoText'>Ожидание подключения игроков.</h1>
                    <ul>
                        {users.map((item, i) => <li key={i}>{item.name}</li>)}
                    </ul>
                    <StyledButton variant="contained" sx={{
                        mb: 1, width: "350px",
                        height: "57px",
                    }} onClick={handleStartGame}>Начать</StyledButton>
                </> :
                <>
                    играем
                </>
            }
        </>
    )
}