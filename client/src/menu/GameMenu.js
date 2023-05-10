import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const GameMenu = () => {

    let navigate = useNavigate();

    const handleStartGame = () => {
        let path = `/game`;
        navigate(path);
    }

    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1">Меню</Typography>
            <Button variant="contained" onClick={handleStartGame}>Начать игру</Button>
        </Box >
    );
}