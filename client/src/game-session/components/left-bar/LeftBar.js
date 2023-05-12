import React from 'react';
import { PlayerBadget } from './PlayerBadget';
import './LeftBar.css';
import { ChatBox } from './ChatBox';
import { Box, Grid } from '@mui/material';

export const LeftBar = ({ messages, message, setMessage, sendMessage, label, player1Score, player2Score }) => {


    return (
        <div className="left-bar">
            <Grid container spacing={2} direction="column" justifyContent="space-around"
                alignItems="center">

                <Grid item><PlayerBadget label={label === 'Player 1' ? 'Player 2' : 'Player 1'} points={label === 'Player 1' ? player2Score : player1Score} /></Grid>
                <Grid item><ChatBox messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage} /></Grid>
                <Grid item><PlayerBadget label={label} points={label === 'Player 1' ? player1Score : player2Score} /></Grid>



            </Grid>

        </div>
    )
};