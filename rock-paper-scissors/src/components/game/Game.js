import React, { useState, useReducer } from 'react';
import InputSelector from './InputSelector';
import axios from 'axios'

function GameComponent() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [choices, setChoices] = useState([null, null]);
    let gameId = 0;
    let playerId = 0;
    const apiURL = `http://127.0.0.1:8000/gameround/${gameId}/player/${playerId}/select/`;

    const submitSelection = (choice) => {
        setChoices([choice, null]);

        console.log(choice, typeof(choice))
        const axPost = async () => {
            setLoading(true);
            try{
                const resp = await axios.post(apiURL, choice)
                console.log(resp);
                console.log(resp.data);
                // Expect response with opponent choice
                if (resp.status == 200){
                    setStatus('Success');
                    setChoices([choice, resp.data])
                }
                else if (resp.status == 202){
                    setStatus('Waiting');
                }
            }
            catch(err){
                console.error(err);
                setStatus("Failed");
            }
            setLoading(false);
        }
        axPost();
    }

    return (
        <>
            <InputSelector submitCallback={submitSelection}/>
            <ul>
                <li>{ choices }</li>
                <li>{ status }</li>
            </ul>
        </>
        
    );
}

export default GameComponent;