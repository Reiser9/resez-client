import React from 'react';

import styles from './index.module.css';

import useSpeakText from '../../hooks/useSpeakText';

import { Pause, Volume } from '../Icons';

const CardPart = ({
    text = "",
    ...props
}) => {
    const {isSpeaking, speakText, clearSpeak, speakIsSupport} = useSpeakText();

    const speakTextHandler = (e) => {
        e.stopPropagation();

        if(isSpeaking){
            return clearSpeak();
        }

        speakText(text);
    }

    return (
        <div {...props}>
            {speakIsSupport() && <button className={styles.cardVolume} onClick={speakTextHandler}>
                {isSpeaking ? <Pause /> : <Volume />}
            </button>}

            <p className={styles.cardText}>{text}</p>
        </div>
    )
}

export default CardPart;