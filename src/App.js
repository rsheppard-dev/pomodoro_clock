import React, { useState, useEffect, useRef } from 'react';
import Break from './components/Break';
import Session from './components/Session';
import Timer from './components/Timer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faMinusSquare, faPlay, faPause, faHistory } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Audio from './components/Audio';

library.add(faPlusSquare, faMinusSquare, faPlay, faPause, faHistory);

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionState, setSessionState] = useState("Session");
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(undefined);

  const audio = useRef(undefined);

  useEffect(() => {
    // toggle between session and break
    if (timer === 0) {
      audio.current.play();
      if (sessionState === 'Session') {
        setTimer(breakLength * 60);
        setSessionState('Break');
      } else {
        setTimer(sessionLength * 60);
        setSessionState('Session');
      }
    }
  }, [sessionState, timer, sessionLength, breakLength]);

  const handleStartStop = () => {
    if (!active) {
      // if countdown is not running - start/setup interval
      const newIntervalId = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return prevTimer - 1;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
      setActive(true);

    } else {
      // if countdown is running - stop timer and clear interval
      clearInterval(intervalId);
      setIntervalId(undefined);
      setActive(false);
    }
  }

  const reset = () => {
    audio.current.load();
    clearInterval(intervalId);
    setIntervalId(undefined);
    setSessionLength(25);
    setBreakLength(5);
    setSessionState('Session');
    setTimer(25 * 60);
    setActive(false);
  }

  return (
    <div className="App">
      <Header />
      <Session length={sessionLength} setLength={setSessionLength} setTimer={setTimer} active={active} />
      <Break length={breakLength} setLength={setBreakLength} active={active} />
      <Timer timer={timer} sessionState={sessionState} />
      <Buttons active={active} reset={reset} handleStartStop={handleStartStop} />
      <Audio audio={audio} />
    </div>
  );
}

export default App;