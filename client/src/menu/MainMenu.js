import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { RulesModal } from './RulesModal';
import { NameModal } from './NameModal';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { StyledButton } from '../common/StyledButton';
import Header from './Header';


export const MainMenu = ({setUser}) => {

    const [isRoolsOpen, setRoolsOpen] = useState(false);
    const [isNameOpen, setNameOpen] = useState(false);

    const onCloseModal = () => {
        setRoolsOpen(false);
    }

    const onCloseName = () => {
        setNameOpen(false);
    }

    let navigate = useNavigate();

    const handlePlay = () => {
        if (JSON.parse(sessionStorage.getItem('user'))) {
            let path = `/menu`;
            navigate(path);
        } else {
            setNameOpen(true);
        }
        
    };

    return (
        <Box
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'start'
            }}

        >
            <Header setUser={setUser} />
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
                    backgroundColor: "#FDEE71"
                }} onClick={handlePlay}>Играть</StyledButton>
                <StyledButton variant="outlined" sx={{
                    mt: 3, mb: 1, width: "350px",
                    height: "57px",
                    border: '3px solid #7B6A5A',
                    // backgroundColor: "#c3dfb1"
                }} onClick={() => setRoolsOpen(true)}>Как играть</StyledButton>
            </Box>

            <RulesModal isOpen={isRoolsOpen} onClose={onCloseModal} />
            <NameModal isOpen={isNameOpen} onClose={onCloseName} />
        </Box >
    );
}
