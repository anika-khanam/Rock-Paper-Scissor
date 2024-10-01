import React, { useState, useReducer, useEffect } from 'react';
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

    if (a == b){
        return "Draw";
    }
    if (a === "r" && b === "p"){ return "Lose"; }
    if (a === "p" && b === "r"){ return "Win"; }
    if (a === "s" && b === "r"){ return "Lose"; }
    if (a === "r" && b === "s"){ return "Win"; }
    if (a === "p" && b === "s"){ return "Lose"; }
    if (a === "s" && b === "p"){ return "Win"; }
}

function GameComponent({ gameID, playerID }) {
    const [status, setStatus] = useState('');
    const [choices, setChoices] = useState([null, null]);
    const [round, setRound] = useState(1);
    const [statCode, setStatCode] = useState(StatusNum.AwaitingSubmit);
    const [wins, setWins] = useState(0);

    const apiURL = `http://127.0.0.1:8000/gameround/${gameID}/player/${playerID}/select/`;

    const submitSelection = (choice) => {
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
                
                // Expect response with opponent choice
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

    useEffect(() => {
        let pollingGet;

        const axGet = async () => {
            try{
                const resp = await axios.get(`http://127.0.0.1:8000/gameround/${gameID}/poll/`)
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

        if (statCode == StatusNum.PollingSubmit){
            pollingGet = setInterval(axGet, 1000);
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
                    </>
                )
            default:
                break;
        }
    }

    return (
        <>
            <p>Round {round} (Best of 5)</p>
            {renderBody()}
        </>
        
    );
}

export default GameComponent;