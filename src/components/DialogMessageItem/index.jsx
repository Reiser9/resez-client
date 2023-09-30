import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Pause, Play } from '../Icons';

const DialogMessageItem = ({
    name,
    time,
    text,
    audio,
    isSelected = false,
    ...props
}) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState("00:00");

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

    React.useEffect(() => {
        audioRef.current?.addEventListener("playing", () => {
            setIsPlaying(true);
        });

        audioRef.current?.addEventListener("ended", () => {
            setIsPlaying(false);
            setCurrentTime("00:00");
        });

        audioRef.current?.addEventListener("pause", () => {
            setIsPlaying(false);
        });
    }, []);

    return (
        <div className={`${styles.messangerDialogItem} ${isSelected ? ` ${styles.selected}` : ""}`} {...props}>
            <div className={base.circle40}>
                {name && name[0]}
            </div>

            <div className={base.baseWrapperGap0}>
                <div className={base.titleInner}>
                    <p className={styles.messangerDialogItemName}>{name}</p>

                    <p className={styles.messangerDialogItemTime}>{time}</p>
                </div>

                {text && <p className={typography.text}>
                    {text}
                </p>}

                {audio && <div className={styles.messangerDialogItemVoice} onClick={togglePlay}>
                    <button className={styles.messangerDialogItemVoicePlay}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>

                    <div className={styles.messangerDialogItemVoiceLine}>
                        <div className={styles.messangerDialogItemVoiceProgress} style={{width: `${progress}%`}}></div>
                    </div>

                    <p className={typography.text2}>{currentTime}</p>

                    <audio src={audio} preload="auto" ref={audioRef} onTimeUpdate={handleTimeUpdate} />
                </div>}
            </div>
        </div>
    )
}

export default DialogMessageItem;