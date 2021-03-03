import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Session({ length, setLength, setTimer, active }) {

    const handleIncrement = () => {
        const newLength = length + 1;
        if (length !== 60) {
            setLength(newLength);
            setTimer(newLength * 60)
        }
    }

    const handleDecrement = () => {
        const newLength = length - 1;
        if (length !== 1) {
            setLength(newLength);
            setTimer(newLength * 60)
        }
    }

    return (
        <section id="session-settings">
            <h3 id="session-label">Session Length</h3>
            <div id="session-container">
                <div>
                    <button onClick={handleIncrement} id="session-increment" disabled={active}>
                        <FontAwesomeIcon icon="plus-square" />
                    </button>
                </div>
                <div id="session-length">
                    { length }
                </div>
                <div>
                    <button onClick={handleDecrement} id="session-decrement" disabled={active}>
                        <FontAwesomeIcon icon="minus-square" />
                    </button>
                </div>
            </div>
        </section>
    )
}
