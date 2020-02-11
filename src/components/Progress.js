import React from 'react';

function Progress(props) {
    return (
        <h2 className='progress'>
            Question {props.current} of {props.total}
        </h2>
    );
}

export default Progress;
