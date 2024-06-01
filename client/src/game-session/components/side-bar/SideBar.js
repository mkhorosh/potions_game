import React, { useEffect, useState } from 'react';
import './SideBar.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, IconButton, Tooltip } from '@mui/material';
import { ReactComponent as Deck } from "../../../asserts/card-suit.svg";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledButton } from '../../../common/StyledButton';
import LogoutIcon from '@mui/icons-material/Logout';

export const SideBar = ({ seconds, setSeconds, room, turn, onCardDrawnHandler, currentUser, drawCardPile }) => {

    useEffect(() => {
        if (turn === currentUser) {
            const timer =
                seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
            return () =>
                clearInterval(timer);
            ;
        }
    });

    const handleClick = () => {

    }

    return (
        <div className="side-bar">
            {turn === currentUser ? <div>Countdown: {seconds}</div> : ""}
            <p>Код игры: {room}</p>
            <IconButton onClick={handleClick}
                style={{ padding: 1 }}
            >
                <SettingsIcon style={{
                    color: "black",
                    fontSize: "24px",
                }} />

            </IconButton>
            <a href='/'> <Button variant="text" sx={{ color: "black" }}>выйти <LogoutIcon sx={{ marginLeft: "5px" }} /></Button></a>
            <Tooltip title={drawCardPile.length} arrow>
                <Deck className="deck" />
            </Tooltip>

            <StyledButton sx={{ backgroundColor: "#FDEE71" }} className='game-button' disabled={turn !== currentUser || drawCardPile.length === 0} onClick={onCardDrawnHandler}>взять карту</StyledButton>

        </div>
    )
};