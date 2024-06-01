import React from 'react';
import { Spinner } from '../../../common/Spinner';

export const GameTable = ({ player2Deck, onCardPlayedHandler, CardBack, turn, player1Deck }) => {

    return (
        <div className="game-zone">
            <div className='player2Deck' style={{ pointerEvents: 'none' }}>
                <p className='playerDeckText'>Player 2</p>

                {player2Deck.map((item, i) => (
                    <img
                        alt="card"
                        key={i}
                        className='Card'
                        onClick={() => onCardPlayedHandler(item)}
                        src={CardBack}
                    />
                ))}
                {turn === 'Player 2' && <Spinner />}
            </div>

            <div className='player1Deck' style={turn === 'Player 1' ? null : { pointerEvents: 'none' }}>
                <p className='playerDeckText'>Player 1</p>
                {player1Deck.map((item, i) => (
                    <img
                        alt="card"
                        key={i}
                        className='Card'
                        src={CardBack}
                    />
                ))}
            </div>
        </div>
    )
};