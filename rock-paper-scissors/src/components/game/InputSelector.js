import React, { useState } from 'react';

function InputSelector({ submitCallback }) {
    const [selected, setSelected] = useState(null);

    const submitHandler = () => {
        let textOption = ["rock", "paper", "scissors"][selected];
        submitCallback(textOption);
    }

    return ( 
        <>
            <h3>Select Choice</h3>
            <button className={selected == 0 ? 'active' : 'inactive'} onClick={() => setSelected(0)}>Rock</button>
            <button className={selected == 1 ? 'active' : 'inactive'} onClick={() => setSelected(1)}>Paper</button>
            <button className={selected == 2 ? 'active' : 'inactive'} onClick={() => setSelected(2)}>Scissors</button>
            <button onClick={submitHandler}>Submit Choice</button>
        </>
    );
}

export default InputSelector;