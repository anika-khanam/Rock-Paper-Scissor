import React, { useState } from 'react';
import axios from 'axios'
import GameComponent from './game/Game';
import WaitOnJoin from './WaitOnJoin';

function GameHub() {
    const [statusinfo, setStatusinfo] = useState("");
    const [joinId, setJoinId] = useState("");
    const [roomID, setRoomID] = useState(null);
    const [gameID, setGameID] = useState(null);

    const createGame = () => {
        const axPost = async () => {
            let player_id=0;
            const apiURL = `http://127.0.0.1:8000/manageroom/create/${player_id}/`;
            try{
                const resp = await axios.post(apiURL)
                console.log(resp);

                if (resp.status == 201){
                    setStatusinfo('Room created');
                }
                setRoomID(resp.data.room_id)
            }
            catch(err){
                console.error(err);
                setStatusinfo("Failed");
            }
        }
        axPost();
    }

    const joinGame = () => {
        const axPost = async () => {
            let player_id=0;
            const apiURL = `http://127.0.0.1:8000/manageroom/join/${joinId}/player/${player_id}/`;
            try{
                const resp = await axios.post(apiURL)
                console.log(resp);

                if (resp.status == 201){
                    setStatusinfo('Room Joined');
                }
                setgameID(resp.data.game_id)
            }
            catch(err){
                console.error(err);
                setStatusinfo("Failed");
            }
        }
        axPost();
    }

    return ( 
        <>
        
            {gameID != null ? <GameComponent gameID={gameID}/> : roomID != null ? <WaitOnJoin roomID={roomID} setGameID={setGameID}/> : <>
            <button onClick={ createGame }>Create Room</button>
            <label htmlFor='roomIDInput'>Room ID</label>
            <input id='roomIDInput' onChange={(e) => setJoinId(e.target.value)}></input>
            <button onClick={ joinGame }>Join Room</button>
            <span>Status: { statusinfo }</span><br />
            <span>Room Code: { joincode }</span><br />
            <span>Game ID: { gameID }</span>
        </>}
        </> 
    );
}

export default GameHub;