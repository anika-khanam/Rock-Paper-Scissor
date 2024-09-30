import React from 'react';

function InputSelector() {
    const [option, setOption] = useState(null);

    return ( 
        <>
            <h3>Select Choice</h3>
            <button onClick={setOption('r')}>Rock</button>
            <button onClick={setOption('p')}>Paper</button>
            <button onClick={setOption('c')}>Scissors</button>
            <button onClick={console.log(option)}>Submit Choice</button>
        </>
    );
}

export default InputSelector;