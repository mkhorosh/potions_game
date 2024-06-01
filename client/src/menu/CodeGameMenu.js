import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StyledButton } from "../common/StyledButton";

export const CodeGameMenu = () => {
    const [roomCode, setRoomCode] = useState('');
    const [numberOfPlayers, setNumber] = useState('3');

    const makeId = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let navigate = useNavigate();
    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1" sx={{ fontSize: "36px", color: "#C3DFB1", mb: 4 }}>Выберите режим игры:</Typography>

            <div className='homepage-join'>
                <TextField required type='text' placeholder='Введите код' sx={{ color: "#C3DFB1", mr: 3 }} onChange={(event) => setRoomCode(event.target.value)} />
                <Link to={`/play?roomCode=${roomCode}`}><StyledButton variant="contained" sx={{ backgroundColor: "#FDEE71" }}>Присоединиться к игре</StyledButton></Link>
                {/* TODO fix empty code input */}
            </div>

            <Typography variant="h1" sx={{ fontSize: "30px", color: "#C3DFB1", mb: 1 }}>или</Typography>
            <select value={numberOfPlayers} onChange={(e) => setNumber(e.target.value)}>
                <option value="2">2 игрока</option>
                <option value="3">3 игрока</option>
                <option value="4">4 игрока</option>
            </select>
            <Link to={`/play?roomCode=${makeId(5)}/options=${numberOfPlayers}/private=${true}`}><StyledButton variant="contained" sx={{ backgroundColor: "#FDEE71" }}>Создать игру</StyledButton></Link>

        </Box>
    )
}