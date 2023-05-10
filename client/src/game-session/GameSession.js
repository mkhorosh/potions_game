import React from 'react';
import './GameSession.css';
import { LeftBar } from './components/left-bar/LeftBar';
import { SideBar } from './components/side-bar/SideBar';
import { GameTable } from './components/game-table/GameTable';

export const GameSession = () => {
    return (
        <div className="wrapper">
            <LeftBar />
            <GameTable />
            <SideBar />
        </div>
    );
}
