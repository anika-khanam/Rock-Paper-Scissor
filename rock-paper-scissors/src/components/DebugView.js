import React from 'react';
import GameHub from './game/GameHub';
import GameComponent from './game/Game';
import LeaderBoards from './LeaderBoardPage/LeaderBoard';

function DebugView() {
    return ( 
        <>
            <GameHub />
            <LeaderBoards />
        </>
     );
}

export default DebugView;