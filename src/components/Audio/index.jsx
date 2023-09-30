import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Pause, Play } from '../Icons';

const Audio = ({
    audio
}) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [duration, setDuration] = React.useState("");

    const audioRef = React.useRef(null);

    const togglePlay = () => {
        audioRef.current.volume = "0.3";

        if(!isPlaying){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }
    }

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progress = (currentTime / duration) * 100;

        const mins = Math.floor(currentTime / 60);
        const secs = (currentTime % 60).toFixed();
        const tempTime = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;

        setCurrentTime(tempTime);

        setProgress(progress);
    }

    const handleLoadedMetadata = () => {
        const currentTime = audioRef.current.duration;
        const mins = Math.floor(currentTime / 60);
        const secs = (currentTime % 60).toFixed();
        const tempTime = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;

        setDuration(tempTime);
    }

    React.useEffect(() => {
        audioRef.current?.addEventListener("playing", () => {
            setIsPlaying(true);
        });

        audioRef.current?.addEventListener("ended", () => {
            setIsPlaying(false);
            setCurrentTime("00:00");
            setProgress(0);
        });

        audioRef.current?.addEventListener("pause", () => {
            setIsPlaying(false);
        });

        // return () => {
        //     audioRef.current.removeEventListener("playing");
        //     audioRef.current.removeEventListener("ended");
        //     audioRef.current.removeEventListener("pause");
        // }
    }, []);

    return (
        <div className={styles.voice} onClick={togglePlay}>
            <button className={styles.voicePlay}>
                {isPlaying ? <Pause /> : <Play />}
            </button>

            <div className={styles.voiceLine}>
                <div className={styles.voiceProgress} style={{width: `${progress}%`}}></div>
            </div>

            <p className={typography.text2}>{isPlaying ? currentTime : duration}</p>

            <audio
                src={audio}
                preload="auto"
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    )
}

export default Audio;