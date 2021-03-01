import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Break({ length, setLength, active }) {

    const handleIncrement = () => {
        length !== 60 && setLength(length + 1);
    }

    const handleDecrement = () => {
        length !== 1 && setLength(length - 1);
    }

    return (
        <section id="break-settings">
            <h2 id="break-label">Break Length</h2>
            <div id="break-container">
                <div>
                    <button onClick={handleIncrement} id="break-increment" disabled={active}>
                        <FontAwesomeIcon icon="plus-square" />
                    </button>
                </div>
                <div id="break-length">
                    { length }
                </div>
                <div>
                    <button onClick={handleDecrement} id="break-decrement" disabled={active}>
                        <FontAwesomeIcon icon="minus-square" />
                    </button>
                </div>
            </div>
        </section>
    )
}
