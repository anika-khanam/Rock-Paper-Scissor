import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import './PlayerPage.css';
import NavigationButtons from "../Navigation/NavigationButtons";

function PlayerPage(){
    const{playerId} = useParams();
    const [playerName,setPlayerName]  = useState("")
    const [Wins,setWins]  = useState("")
    const [accountId,setAccountId] = useState("")
    const [Losses,setLosses] = useState("")
    const [isPlayer,setIsPlayer] = useState(false)
    const[isEditing,setIsEditing] = useState(false)


    useEffect(()=>{
        try{
            const fetchPlayer = async()=>{
                const response = await axiosInstance.get(`players/${playerId}/`);
                const player = response.data
                if (playerName=="")
                    setPlayerName(player.playerName)
                setWins(player.wins)
                setLosses(player.losses)
                setAccountId(player.userID)

            };
            fetchPlayer();
        } catch(error){
            console.log('Error fetching data',error)
        };
        if (playerId==localStorage.getItem('user_id')){
            setIsPlayer(true)
        }
    }, [])


    const handleSubmit = async(e) => {
        console.log(playerName)
        e.preventDefault();

        const response = await axiosInstance.put(`players/${playerId}/`,
            {playerName,Wins,Losses,accountId});
        localStorage.setItem('username',playerName)
        setIsEditing(false)
    }

    const handleCancel = (e) =>{
        setPlayerName(localStorage.getItem('username'))
        setIsEditing(false)
    }

    if (isPlayer){
        if(isEditing){
            return(
                <>
                    <div className="hero">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <button type="submit">Save</button>
                            <button type="reset" onClick={()=>handleCancel()}>Cancel</button>
                        </form>
                    </div>
                    <div className="stats">
                        <h2>Wins: {Wins}</h2>
                        <h2>Losses: {Losses}</h2>
                    </div>
                    <NavigationButtons />
                </>

            )
        }
        else{
            return(
                <>
                    <div className="hero">
                        <h1>{playerName}</h1>
                        <button style={{background:"gray"}} onClick= {() =>setIsEditing(true)}>Edit</button>
                        <button style={{background:"red"}}>Delete</button>
                    </div>
                    <div className="stats">
                        <h2>Wins: {Wins}</h2>
                        <h2>Losses: {Losses}</h2>
                    </div>
                    <NavigationButtons />
                </>
            )
        }
    }
    else{
        return(
            <>
            <div className="hero">
                <h1>{playerName}</h1>
            </div>
            <div className="stats">
                <h2>Wins: {Wins}</h2>
                <h2>Losses: {Losses}</h2>
            </div>
            <NavigationButtons />
            </>
        )
    }
    
}

export default PlayerPage

