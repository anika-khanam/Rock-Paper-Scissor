import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './PlayerPage.css';

function PlayerPage(){
    const{playerId} = useParams();
    const [playerName,setPlayerName]  = useState("")
    const [Wins,setWins]  = useState("")
    const [Losses,setLosses] = useState("")

    useEffect(()=>{
        try{
            const fetchPlayer = async()=>{
                const response = await axios.get(`http://127.0.0.1:8000/players/${playerId}/`);
                const player = response.data
                setPlayerName(player.playerName)
                setWins(player.wins)
                setLosses(player.losses)

            };
            fetchPlayer();
        } catch(error){
            console.log('Error fetching data',error)
        };
    })


    return(
        <>
        <div className="hero">
            <h1>{playerName}</h1>
        </div>
        <div className="stats">
            <h2>Wins: {Wins}</h2>
            <h2>Losses: {Losses}</h2>
        </div>
        </>
    )
}

export default PlayerPage

