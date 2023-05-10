import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { RulesModal } from './RulesModal';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {

    const [isRoolsOpen, setRoolsOpen] = useState(false);

    const onCloseModal = () => {
        setRoolsOpen(false);
    }
    let navigate = useNavigate();

    const handlePlay = () => {
        let path = `/menu`;
        navigate(path);
    }
 
    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1">Зельеварение</Typography>
            <Button variant="contained" onClick={handlePlay}>Играть</Button>
            <Button variant="contained" onClick={() => setRoolsOpen(true)}>Как играть</Button>
            <RulesModal isOpen={isRoolsOpen} onClose={onCloseModal} />
        </Box >
    );
}
 