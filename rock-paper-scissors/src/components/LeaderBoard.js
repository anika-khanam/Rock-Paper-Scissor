import React, { useEffect,useState} from "react";
import axios from 'axios';


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
            <h3>LeaderBoards</h3>
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
                        <tr key = {player.id}>
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