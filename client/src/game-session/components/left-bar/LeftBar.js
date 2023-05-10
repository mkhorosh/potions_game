import React from 'react';
import { PlayerBadget } from './PlayerBadget';
import './LeftBar.css';
import { ChatBox } from './ChatBox';

export const LeftBar = () => {


    return (
        <div className="left-bar">
            <PlayerBadget />
            <ChatBox />
            <PlayerBadget />
        </div>
    )
};