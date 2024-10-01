import React, { useState, useEffect } from 'react';
import axios from 'axios'

function WaitOnJoin({ roomID, setGameID }) {
    const [statusinfo, setStatusinfo] = useState("");

    useEffect(() => {
        const pollGame = () => {
            const axGet = async () => {
                const apiURL = `http://127.0.0.1:8000/manageroom/poll/${roomID}/`;
                try{
                    const resp = await axios.get(apiURL)
                    console.log(resp);
    
                    if (resp.status == 201){
                        setStatusinfo('Room Joined');
                        clearInterval(pollInterval)
                    }
                    setGameID(resp.data.game_id)
                }
                catch(err){
                    console.error(err);
                    setStatusinfo("Failed");
                }
            }
            axGet();
        }
    
        const pollInterval = setInterval(pollGame, 1000)
        return () => clearInterval(pollInterval)
    }, [])
    

    return ( 
        <div>
            <p>Waiting for player to join...</p>
            <p>Room ID: {roomID}</p>
            <p>Status: {statusinfo}</p>
        </div>
    );
}

export default WaitOnJoin;