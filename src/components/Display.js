import React, { useEffect, useState, useRef } from "react";
import Styles from "./Display.module.css";

function Display() {
  const [clockData, setClockData] = useState({
    seconds: 1,
    sec: 0,
    min: 0,
    hour: 0,
    secRotation: -90,
    minRotation: -90,
    hourRotation: -90,
    paused: false,
  });

  const timerRef = useRef(null);

  const handleTimer = () => {
    const secHand = document.getElementsByClassName(`${Styles.sec}`);
    const minHand = document.getElementsByClassName(`${Styles.min}`);
    const hourHand = document.getElementsByClassName(`${Styles.hour}`);

    return setInterval(() => {
      secHand[0].style.transform = `rotate(${clockData.secRotation}deg)`;
      minHand[0].style.transform = `rotate(${clockData.minRotation}deg)`;
      hourHand[0].style.transform = `rotate(${clockData.hourRotation}deg)`;
      setClockData((prevState) => ({
        ...prevState,
        secRotation: prevState.secRotation + 6,
        seconds: prevState.seconds + 1,
        sec: clockData.seconds % 60 === 0 ? 0 : prevState.sec + 1,
        min: clockData.seconds % 60 === 0 ? prevState.min + 1 : prevState.min,
        hour:
          clockData.seconds % 3600 === 0 ? prevState.hour + 1 : prevState.hour,
        minRotation:
          clockData.seconds % 60 === 0
            ? prevState.minRotation + 3
            : prevState.minRotation,
        hourRotation:
          clockData.seconds % 3600 === 0
            ? prevState.hourRotation + 30
            : prevState.hourRotation,
      }));
    }, 1000);
  };

  const handleReset = () => {
    setClockData({
      seconds: 1,
      sec: 0,
      min: 0,
      hour: 0,
      secRotation: -90,
      minRotation: -90,
      hourRotation: -90,
      paused: false,
    });
  };

  const handlePause = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setClockData((prevState) => ({
        ...prevState,
        paused: true,
      }));
    } else {
      const timer = handleTimer();
      timerRef.current = timer;
      setClockData((prevState) => ({
        ...prevState,
        paused: false,
      }));
    }
  };

  useEffect(() => {
    if (clockData.paused !== true) {
      const timer = handleTimer();
      timerRef.current = timer;
    }

    return () => {
      if (clearInterval !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [clockData, handleTimer]);

  return (
    <>
      <div className={Styles.circle}>
        <div className={Styles.sec}></div>
        <div className={Styles.min}></div>
        <div id="hour" className={Styles.hour}></div>
      </div>
      <p>Hour: {clockData.hour}</p>
      <p>Minute: {clockData.min}</p>
      <p>Second: {clockData.sec}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handlePause}>
        {clockData.paused ? "Start" : "Pause"}
      </button>
    </>
  );
}

export default Display;
