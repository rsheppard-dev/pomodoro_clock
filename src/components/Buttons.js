import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Buttons({active, reset, handleStartStop, iconColor}) {   
    return (
        <div id="buttons">
            <button id="start_stop" onClick={handleStartStop}><FontAwesomeIcon icon={ !active ? "play" : "pause" } style={ { color: `${iconColor}` } } /></button>
            <button id="reset" onClick={reset}><FontAwesomeIcon icon="history" style={ { color: `${iconColor}` } } /></button>
        </div>
    )
}
