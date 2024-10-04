import React, { useEffect,useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import './LeaderBoardPage.css'
import NavigationButtons from "../Navigation/NavigationButtons";


function LeaderBoards(){
    const[leaderBoard,setLeaderBoard] = useState([]);


    useEffect(()=>{
        const fetchLeaderBoards = async()=>{
            const response = await axiosInstance.get('leaderboard/');
            setLeaderBoard(response.data)
        };
        fetchLeaderBoards();
    },[])
    

    return(
        <div className="leaderboard">
            <div className="hero">
                <h1>Leaderboard</h1>
            </div>
            <NavigationButtons />
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
        </div>
    )
    
}

export default LeaderBoards