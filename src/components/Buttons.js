import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Buttons({active, reset, handleStartStop}) {   
    return (
        <div id="buttons">
            <button id="start_stop" onClick={handleStartStop}><FontAwesomeIcon icon={ !active ? "play" : "pause" } /></button>
            <button id="reset" onClick={reset}><FontAwesomeIcon icon="history" /></button>
        </div>
    )
}
