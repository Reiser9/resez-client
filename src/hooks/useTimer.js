import React from "react";

const useTimer = (countdownSeconds, onTimerEnd) => {
    const [remainingTime, setRemainingTime] = React.useState(0);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [timerEnded, setTimerEnded] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);

    React.useEffect(() => {
        let interval;

        if(!isPaused){
            interval = setInterval(() => {
                setRemainingTime((prevRemainingTime) => {
                    if(prevRemainingTime === 0){
                        clearInterval(interval);
                        setTimerEnded(true);
                        onTimerEnd();

                        return 0;
                    }
                    return prevRemainingTime - 1;
                });

                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [countdownSeconds, isPaused, onTimerEnd]);

    React.useEffect(() => {
        if(countdownSeconds){
            setRemainingTime(countdownSeconds * 60);
        }
    }, countdownSeconds);

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
    };
};

export default useTimer;