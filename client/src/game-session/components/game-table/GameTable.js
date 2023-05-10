import React from 'react';
import { ElementsStorage } from './ElementsStorage';
import { RivalHand } from './RivalHand';
import UserHand from './UserHand';

export const GameTable = () => {

    return (
        <div className="game-zone">
            <RivalHand />
            <ElementsStorage />
            <UserHand />
        </div>
    )
};