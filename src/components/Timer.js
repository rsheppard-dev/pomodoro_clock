import React from 'react';

export default function Timer({timer, sessionState}) {

    const displayTimer = () => {
        const minutes = (timer / 60) < 10 ?
            `0${Math.floor(timer / 60)}` :
            Math.floor(timer / 60);

        const seconds = (timer % 60) < 10 ? 
            `0${timer % 60}` :
            timer % 60;

        return `${minutes}:${seconds}`;
    }

    return (
        <section id="timer">
            <h2 id="timer-label">{sessionState}</h2>
            <div id="time-left">
                {displayTimer()}
            </div>
        </section>
    )
}