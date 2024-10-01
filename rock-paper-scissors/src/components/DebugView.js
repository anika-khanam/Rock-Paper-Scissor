import React from 'react';
import GameHub from './GameHub';
import GameComponent from './game/Game';
import LeaderBoards from './LeaderBoard';

function DebugView() {
    return ( 
        <>
            <GameHub />
            <LeaderBoards />
        </>
     );
}

export default DebugView;