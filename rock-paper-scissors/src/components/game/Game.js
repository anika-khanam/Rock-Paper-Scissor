import React, { useState, useReducer } from 'react';
import InputSelector from './InputSelector';
import axios from 'axios'

function GameComponent() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const apiURL = 'http://127.0.0.1:8000/endpoints/gameround/';

    const submitSelection = (choice) => {
        const axPost = async () => {
            setLoading(true);
            try{
                const resp = await axios.post(apiURL, choice)
                console.log(resp);
                console.log(resp.data);
                // Expect response with opponent choice
                if (resp.status == 200){
                    setStatus('Success');
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
        <InputSelector submitCallback={submitSelection}/>
    );
}

export default GameComponent;