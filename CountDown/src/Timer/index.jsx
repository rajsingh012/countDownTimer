import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const Timer = ({duration, onExpire}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [pauseTimer, setPauseTimer] = useState(false);

    useEffect(() => {
        if(pauseTimer) return;
        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1000);
        }, 1000);

        if (timeLeft <= 0) {
            clearTimeout(timerId);
            onExpire();
        }

        return () => {
            clearTimeout(timerId);
        };

    }, [timeLeft, onExpire, pauseTimer]);

    const pauseBtn = () => {
        if(pauseTimer === false){
            setPauseTimer(true);
        } else {
            setPauseTimer(false);
        }
    }

    const getFormattedTime = (time) => {
        const days = Math.floor(time / DAY);
        const hours = Math.floor((time % DAY) / HOUR);
        const minutes = Math.floor((time % HOUR) / MINUTE);
        const seconds = Math.floor((time % MINUTE) / SECOND);

        return {days, hours, minutes, seconds};
    }

    const {days, hours, minutes, seconds} = getFormattedTime(timeLeft);

    return(
       <div>
            <div className="timer-wrapper">
                <div className="timer-data">
                    <h4 className="timer-heading">Days</h4>
                    <p className="timer-values">{days}</p>
                </div>
                <div className="timer-data">
                    <h4 className="timer-heading">Hours</h4>
                    <p className="timer-values">{hours}</p>
                </div>
                <div className="timer-data">
                    <h4 className="timer-heading">Minutes</h4>
                    <p className="timer-values">{minutes}</p>
                </div>
                <div className="timer-data">
                    <h4 className="timer-heading">Seconds</h4>
                    <p className="timer-values">{seconds}</p>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className="btns" onClick={() => setTimeLeft(duration)}>Reset</button>
                <button className="btns" onClick={() => pauseBtn()} disabled={pauseTimer}>Pause</button>
                <button className="btns" onClick={() => setPauseTimer(false)} disabled={!pauseTimer} >Resume</button>
            </div>
       </div>
    );
};

Timer.defaultProps = {
    duration: 60 * 1000,
    onExpire: () => {}
};

export default Timer;