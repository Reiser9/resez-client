import React from "react";

const useTimer = (countdownSeconds, onTimerEnd) => {
    const [remainingTime, setRemainingTime] = React.useState(0);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [timerEnded, setTimerEnded] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isRestart, setIsRestart] = React.useState(false);

    React.useEffect(() => {
        let interval;

        if(!isPaused || isRestart){
            interval = setInterval(() => {
                setRemainingTime(prev => {
                    if(prev === 0){
                        clearInterval(interval);
                        setTimerEnded(true);
                        onTimerEnd();

                        return 0;
                    }

                    if(isRestart){
                        setElapsedTime(0);
                        setRemainingTime(countdownSeconds * 60);
                        setIsRestart(false);
                        setIsPaused(false);
                    }

                    return prev - 1;
                });

                setElapsedTime(prev => prev + 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [countdownSeconds, isPaused, onTimerEnd, isRestart]);

    React.useEffect(() => {
        if(countdownSeconds){
            setRemainingTime(countdownSeconds * 60);
        }
    }, countdownSeconds);

    const restartTimer = () => {
        setIsRestart(true);
    }

    const handlePauseResume = () => {
        setIsPaused(prev => !prev);
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
      
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return {
        remainingTime: formatTime(remainingTime),
        elapsedTime: formatTime(elapsedTime),
        elapsed: elapsedTime,
        isPaused,
        timerEnded,
        pauseResume: handlePauseResume,
        restartTimer
    };
};

export default useTimer;