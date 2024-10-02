import React, { useState } from 'react';
import axios from 'axios'
import GameComponent from './Game';
import WaitOnJoin from './WaitOnJoin';
import './gameHub.css'

function GameHub() {
    const [statusinfo, setStatusinfo] = useState("");
    const [joinId, setJoinId] = useState("");
    const [player_id, setPlayer_id] = useState("");
    const [roomID, setRoomID] = useState(null);
    const [gameID, setGameID] = useState(null);

    const createGame = () => {
        const axPost = async () => {
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
                setStatusinfo(err.response.data.error);
            }
        }
        axPost();
    }

    const joinGame = () => {
        const axPost = async () => {
            const apiURL = `http://127.0.0.1:8000/manageroom/join/${joinId}/player/${player_id}/`;
            try{
                const resp = await axios.post(apiURL)
                console.log(resp);

                if (resp.status == 201){
                    setStatusinfo('Room Joined');
                }
                setGameID(resp.data.game_id)
            }
            catch(err){
                console.error(err);
                setStatusinfo(err.response.data.error);
            }
        }
        axPost();
    }

    const finishGame = () => {
        setGameID(null);
        setRoomID(null);
    }

    return ( 
        <>
        
            {gameID != null ? <GameComponent gameID={gameID} playerID={player_id} completionCallback={finishGame}/> : 
             roomID != null ? <WaitOnJoin roomID={roomID} setGameID={setGameID}/> : 
            <div id='hubSelect'>
                <div className="inputLabel">
                    <label htmlFor='playerIDInput'>Player ID: </label>
                    <input id='playerIDInput' onChange={(e) => setPlayer_id(e.target.value)}></input>
                </div>
                <button className='GameHubButton' onClick={ createGame }>Create Room</button>
                <div className="inputLabel">
                    <label htmlFor='roomIDInput'>Room ID: </label>
                    <input id='roomIDInput' onChange={(e) => setJoinId(e.target.value)}></input>
                </div>
                <button className='GameHubButton' onClick={ joinGame }>Join Room</button>
                <div id="debugInfo">
                    <span>Status: { statusinfo }</span><br />
                    <span>Room Code: { roomID }</span><br />
                    <span>Game ID: { gameID }</span>
                </div>
            </div>}
        </> 
    );
}

export default GameHub;