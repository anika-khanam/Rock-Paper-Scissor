import React, { useState, useEffect } from 'react';
import InputSelector from './InputSelector';
import axios from 'axios'

class StatusNum {
    static AwaitingSubmit = 0;
    static Submission = 1;
    static PollingSubmit = 2;
    static ResultDisplay = 3;
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

    const submitSelection = (choice) => {
        const apiURL = `http://127.0.0.1:8000/gameround/${gameID}/player/${playerID}/select/`;
        setStatCode(StatusNum.Submission)
        setChoices([choice, null]);

        console.log(choice, typeof(choice))
        const axPost = async () => {
            try{
                const resp = await axios.post(apiURL, choice)
                console.log(resp);
                if (resp.status > 202){
                    console.log(resp.data.error);
                }
                
                // Expected behaviour is to poll for round selections
                if (resp.status === 200){
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
        const apiURL = `http://127.0.0.1:8000/gameround/${gameID}/player/${playerID}/finalize`;
        console.log("Ending Game");

        const axPost = async () => {
            try{
                const resp = await axios.post(apiURL, {"wins": wins, "losses": (round - wins)})
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

    useEffect(() => {
        let pollingGet;
        const apiURL = `http://127.0.0.1:8000/gameround/${gameID}/poll/`

        const axGet = async () => {
            try{
                const resp = await axios.get(apiURL)
                if (resp.status === 204){
                    // No response keep polling
                }

                if (resp.status === 200){
                    // Placeholder example
                    setChoices(resp.data);
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
            if (wins <= 2 && round - wins <= 2){
                // Another Round
                setTimeout(() => {
                    setRound(round + 1)
                    setStatCode(StatusNum.AwaitingSubmit)
                }, 3000);
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
                        <ul>
                            <li>{ choices }</li>
                            <li>{ status }</li>
                        </ul>
                    </>
                );
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
                        <p>{wins === 3 ? "You Won the Match" : "You Lost the Match"}</p>
                        <button onClick={terminateGame}>Return to Menu</button>
                    </>
                )
            default:
                break;
        }
    }

    return (
        <>
            <p>Round {round} (Best of 5)</p>
            <p>Wins: {wins}</p>
            {renderBody()}
        </>
        
    );
}

export default GameComponent;