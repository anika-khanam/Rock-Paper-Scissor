import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import AnimatedEllipses from '../utils/AnimatedEllipses';

function WaitOnJoin({ roomID, setGameID }) {
    const [statusinfo, setStatusinfo] = useState("");

    useEffect(() => {
        const pollGame = () => {
            const axGet = async () => {
                try{
                    const resp = await axiosInstance.get(`manageroom/poll/${roomID}/`)
                    console.log(resp);
    
                    if (resp.status === 200){
                        setStatusinfo('Room Joined');
                        clearInterval(pollInterval)
                        setGameID(resp.data.game_id)
                    }
                    else if (resp.status === 204){
                        console.log("Waiting on game id");
                        setStatusinfo("Waiting")
                    }
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
        <div className='pageDiv'>
            <span>Waiting for player to join</span><AnimatedEllipses speed={500}/>
            <p>Room ID: {roomID}</p>
            <p>Status: {statusinfo}</p>
        </div>
    );
}

export default WaitOnJoin;