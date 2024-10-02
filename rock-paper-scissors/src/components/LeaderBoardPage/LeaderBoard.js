import React, { useEffect,useState} from "react";
import axios from 'axios';
import './LeaderBoardPage.css'


function LeaderBoards(){
    const[leaderBoard,setLeaderBoard] = useState([]);


    useEffect(()=>{
        const fetchLeaderBoards = async()=>{
            const response = await axios.get('http://127.0.0.1:8000/leaderboard/');
            setLeaderBoard(response.data)
        };
        fetchLeaderBoards();
    },[])
    

    return(
        <>
            <div className="hero">
                <h1>Leaderboard</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard.map((player) =>(
                        player.rank%2==0?(
                        <tr style={{background: "white"}} key = {player.id}>
                            <td>{player.rank}</td>
                            <td>{player.playerName}</td>
                            <td>{player.wins}</td>
                        </tr>
                        ) :
                        <tr style={{background: "#fedf7b"}} key = {player.id}>
                            <td>{player.rank}</td>
                            <td>{player.playerName}</td>
                            <td>{player.wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
    
}

export default LeaderBoards