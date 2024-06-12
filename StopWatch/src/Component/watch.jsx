import React, { useEffect, useState } from 'react';

const Watch = () => {
    const [watch, setWatch] = useState(0);
    const [start, setStart] = useState(false);

    const startHandle = () => {
        setStart(true);
    }

    useEffect(() => {
        let timer;
        if (start) {
            timer = setTimeout(() => {
                setWatch(watch + 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
        }

    }, [start, watch]);

    const pauseHandle = () => {
        setStart(false);
    }

    const resetHandle = () => {
        setWatch(0);
        setStart(false);
    }

    const days = Math.floor(watch / 86400);
    const hours = Math.floor((watch % 86400) / 3600);
    const minutes = Math.floor(((watch % 86400) % 3600) / 60);
    const seconds = Math.floor(((watch % 86400) % 3600) % 60);

    return (
        <div className="stopwatch">
            <h1 id="watch">{days} : {hours} : {minutes} : {seconds}</h1>
            <button className="stopwatch-button" onClick={startHandle}>Start</button>
            <button className="stopwatch-button" onClick={pauseHandle}>Pause</button>
            <button className="stopwatch-button" onClick={resetHandle}>Reset</button>
        </div>
    );
}

export default Watch;