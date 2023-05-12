import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton } from "../common/style/StyledButton";
import { useState } from "react";
import { makeid } from '../utilits/codeGenerator'

export const GameMenu = () => {

    const [roomCode, setRoomCode] = useState('');


    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1" sx={{ fontSize: "36px", color: "#C3DFB1", mb: 4 }}>Выберите режим игры:</Typography>

            <div className='homepage-join'>
                <TextField type='text' placeholder='Введите код' sx={{ color: "#C3DFB1", mr:3 }} onChange={(event) => setRoomCode(event.target.value)} />
                <Link to={`/play?roomCode=${roomCode}`}><StyledButton variant="contained">Присоединиться к игре</StyledButton></Link>
            </div>

            <Typography variant="h1" sx={{ fontSize: "30px", color: "#C3DFB1", mb: 1 }}>или</Typography>
            <Link to={`/play?roomCode=${makeid(5)}`}><StyledButton variant="contained">Создать игру</StyledButton></Link>

        </Box >
    );
}