import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { RulesModal } from './RulesModal';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { StyledButton } from '../common/style/StyledButton';


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
        <Box
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'start'
            }}

        >
            <Box sx={{mt:12,}}>
                <h1 className='main-title'>Зельеварение</h1>
            </Box>
            
            <Box component="" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <StyledButton variant="contained" sx={{
                    mb: 1, width: "350px",
                    height: "57px",
                }} onClick={handlePlay}>Играть</StyledButton>
                <StyledButton variant="contained" sx={{
                    mt: 3, mb: 1, width: "350px",
                    height: "57px",
                }} onClick={() => setRoolsOpen(true)}>Как играть</StyledButton>
            </Box>

            <RulesModal isOpen={isRoolsOpen} onClose={onCloseModal} />
        </Box >
    );
}
