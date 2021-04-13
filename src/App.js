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
  const audio = useRef(undefined);

  const styles = {
    main: '#bb3b0e',
    break: '#335C67',
    first: '#708160',
    second: '#dd7631',
    third: '#900c3f' 
  }

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionState, setSessionState] = useState("Session");
  const [timer, setTimer] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(undefined);
  const [bgColor, setBgColor] = useState(styles.main);

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

    // style background based on state
    const percentage = (timer / (sessionLength * 60)) * 100;

    if (intervalId) {
      if (sessionState === 'Break') {
        setBgColor(styles.break);
      } else if (percentage < 20) {
        setBgColor(styles.third);
      } else if (percentage < 50) {
        setBgColor(styles.second);
      } else if (percentage < 100) {
        setBgColor(styles.first);
      }
    } else {
      setBgColor(styles.main);
    }

    document.body.style.backgroundColor = bgColor;

  }, [sessionState, timer, sessionLength, breakLength, bgColor]);

  const handleStartStop = () => {
    if (!intervalId) {
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

    } else {
      // if countdown is running - stop timer and clear interval
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }

  const reset = () => {
    audio.current.load();
    clearInterval(intervalId);
    setIntervalId(undefined);
    setBgColor(styles.main);
    setSessionLength(25);
    setBreakLength(5);
    setSessionState('Session');
    setTimer(25 * 60);
  }

  return (
    <div className="App">
      <Header />
      <Session length={sessionLength} setLength={setSessionLength} setTimer={setTimer} active={intervalId} />
      <Break length={breakLength} setLength={setBreakLength} active={intervalId} />
      <Timer timer={timer} sessionState={sessionState} />
      <Buttons active={intervalId} reset={reset} handleStartStop={handleStartStop} iconColor={bgColor} />
      <Audio audio={audio} />
    </div>
  );
}

export default App;