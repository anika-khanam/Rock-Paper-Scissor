import React, { useState, useEffect } from 'react';
import InputSelector from './InputSelector';
import axiosInstance from '../utils/axiosInstance';
import AnimatedEllipses from '../utils/AnimatedEllipses';

class StatusNum {
    static AwaitingSubmit = 0;
    static Submission = 1;
    static PollingSubmit = 2;
    static ResultDisplay = 3;
    static GameTerminated = 4;
    static GameEnd = 5;
}

function RPSwinner(choices){
    let a = choices[0][0].toLowerCase();
    let b = choices[1][0].toLowerCase();

    if (a === b){
        return "Draw";
    }
    if (a === "r" && b === "p"){ return "Lose"; }
    if (a === "p" && b === "r"){ return "Win"; }
    if (a === "s" && b === "r"){ return "Lose"; }
    if (a === "r" && b === "s"){ return "Win"; }
    if (a === "p" && b === "s"){ return "Lose"; }
    if (a === "s" && b === "p"){ return "Win"; }
}

function GameComponent({ gameID, playerID, completionCallback }) {
    const [status, setStatus] = useState('');
    const [choices, setChoices] = useState([null, null]);
    const [round, setRound] = useState(1);
    const [statCode, setStatCode] = useState(StatusNum.AwaitingSubmit);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const submitSelection = (choice) => {
        setStatCode(StatusNum.Submission)
        setChoices([choice, null]);

        console.log(choice, typeof(choice))
        const axPost = async () => {
            try{
                const resp = await axiosInstance.post(`gameround/${gameID}/player/${playerID}/select/`, {"choice":choice})
                console.log(resp);
                if (resp.status == 204){
                    console.log(resp.data.message);
                    setStatus('Try Again');
                }
                
                // Expected behaviour is to poll for round selections
                if (resp.status === 202){
                    setStatus('Waiting');
                    setStatCode(StatusNum.PollingSubmit)
                }
            }
            catch(err){
                console.error(err);
                setStatus("Failed");
            }
        }
        axPost();
    }

    const terminateGame = () => {
        console.log("Ending Game");

        const axPost = async () => {
            try{
                const resp = await axiosInstance.post(`gameround/${gameID}/player/${playerID}/finalize/`, 
                    {"wins": wins, "losses": losses, "draws": 5 - wins - losses}
                )
                if (resp.status === 200) {
                    console.log("Updated server records");
                    completionCallback();
                }
            }
            catch(err){
                console.error(err);
                setStatus("Failed");
            }
        }

        axPost();
    }

    const quitConfirm = () => {
        if (window.confirm("Quitting will forfeit the match, hit OK to proceed or Cancel to continue")){
            forfeitGame()
        }
    }

    const forfeitGame = () => {
        const axPost = async () => {
            try {
                const resp = await axiosInstance.post(`gameround/${gameID}/player/${playerID}/terminate/`);

                if (resp.status === 200){
                    console.log("Terminated Game");
                    completionCallback();
                }
            } catch (err) {
                console.error(err);
                setStatus("Failed");
            }
        }
        axPost();
    }

    useEffect(() => {
        let pollingGet;

        const axGet = async () => {
            try{
                const resp = await axiosInstance.get(`gameround/${gameID}/player/${playerID}/result/`)
                if (resp.status === 204){
                    // No response keep polling
                }

                if (resp.status === 202){
                    // Game terminated
                    setStatCode(StatusNum.GameTerminated);
                    clearInterval(pollingGet);
                }

                if (resp.status === 200){
                    // Placeholder example
                    setChoices([resp.data.requester_choice, resp.data.other_choice]);
                    setStatCode(StatusNum.ResultDisplay);
                    clearInterval(pollingGet);
                }
            }
            catch (err){
                console.error(err);
            }
        }

        if (statCode === StatusNum.PollingSubmit){
            pollingGet = setInterval(axGet, 1000);
        }

        if (statCode === StatusNum.ResultDisplay){
            if (RPSwinner(choices) == "Win") { setWins(wins + 1); }
            else if (RPSwinner(choices) == "Lose") { setLosses(losses + 1); }
            if (wins <= 2 && losses <= 2 && round <= 4){
                // Another Round
                setTimeout(() => {
                    setRound(round + 1)
                    setStatCode(StatusNum.AwaitingSubmit)
                }, 1000);
            }
            else{
                // Game End
                setTimeout(() => {
                    setStatCode(StatusNum.GameEnd)
                }, 3000);
            }
        }

        return () => clearInterval(pollingGet)
    }, [statCode, gameID])

    const renderBody = () => {
        switch (statCode) {
            case StatusNum.AwaitingSubmit:
                return (
                    <>
                        <InputSelector submitCallback={submitSelection}/>
                        <ul style={{listStyleType: "none"}}>
                            {choices[0] !== null && <li>You Chose: {choices[0]}, Your opponent chose: {choices[1]}</li>}
                            {status!=='' && <li>Status: { status }</li>}
                        </ul>
                    </>
                );
            case StatusNum.PollingSubmit:
                return (
                    <>
                        <span>Waiting for opponent</span><AnimatedEllipses speed={500}/>
                    </>
                )
            case StatusNum.ResultDisplay:
                return (
                    <>
                        <p>You played: {choices[0]}</p>
                        <p>Your opponent played: {choices[1]}</p>
                        <p>Result: You {RPSwinner(choices)}</p>
                    </>
                )
            case StatusNum.GameEnd:
                return (
                    <>
                        <p>{wins > losses ? "You Won the Match" : wins < losses ? "You Lost the Match" : "You drew the match"}</p>
                        <button onClick={terminateGame}>Return to Menu</button>
                    </>
                )
            case StatusNum.GameTerminated:
                return (
                    <>
                        <p>Other user quit, you have been awarded the win!</p>
                        <button onClick={completionCallback}>Return to Menu</button>
                    </>
                )
            default:
                break;
        }
    }

    return (
        <div style={{textAlign: 'center'}}>
            {statCode !== StatusNum.GameEnd && <><button onClick={quitConfirm}>Quit</button><br /></>}
            <p>Round {round} (Best of 5)</p>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            {statCode != StatusNum.ResultDisplay ? <p>Draws: {(round - 1) - wins - losses}</p> : <p>Draws: {round - wins - losses}</p> }
            {renderBody()}
        </div>
        
    );
}

export default GameComponent;