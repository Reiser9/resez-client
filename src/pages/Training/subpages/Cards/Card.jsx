import React from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './index.module.css';

import {Volume} from '../../../../components/Icons';

const Card = ({text = "", answer = ""}) => {
    const [rotate, setRotate] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [callback, setCallback] = React.useState("");
    const [position, setPosition] = React.useState({ x: 0, y: 0, rotate: 0 });
    const [color, setColor] = React.useState({r: 0, g: 0, b: 0});

    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const [speech, setSpeech] = React.useState(null);

    const speakMessage = (text) => {
        if('speechSynthesis' in window) {
            if (isSpeaking) {
                speechSynthesis.cancel();
                setIsSpeaking(false);
                setSpeech(null);
            } else {
                const newSpeech = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(newSpeech);
                setIsSpeaking(true);
                setSpeech(newSpeech);
            }
        }else {
            console.log("Ваш браузер не поддерживает Text-to-Speech");
        }
    };

    const handlers = useSwipeable({
        onSwipeStart: () => {
            setIsDragging(true);
        },
        onSwiping: (data) => {
            const {deltaX, deltaY} = data;

            setPosition({
                x: deltaX,
                y: deltaY,
                rotate: deltaX / 14
            });

            setColor({
                r: deltaX < 0 ? -deltaX : 0,
                g: deltaX > 0 ? deltaX : 0,
                b: 0
            });
        },
        onSwiped: (data) => {
            const {deltaX, deltaY} = data;

            setCallback(deltaX > 125 ? "Вправо" : deltaX < -125 ? "Влево" : "");
            deltaX > 125 ? console.log("Правильно") : deltaX < -125 && console.log("Неверно")

            setColor({
                r: 0,
                g: 0,
                b: 0
            });

            setPosition({
                x: 0,
                y: 0,
                rotate: 0
            });

            setIsDragging(false);
        },
        preventScrollOnSwipe: true
    });

    const myRef = React.useRef();

    const refPassthrough = (el) => {
        handlers.ref(el);

        myRef.current = el;
    }

    return (
        <div className={`${styles.card}${!isDragging ? ` ${styles.cardTransition}` : ""}${rotate ? ` ${styles.rotate}` : ""}`} {...handlers} ref={refPassthrough}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                transform: `rotate(${position.rotate}deg) perspective(600px)${rotate ? " rotateY(180deg)" : ""}`,
                userSelect: "none",
                background: `rgba(${color.r}, ${color.g}, ${color.b})`
            }}
            onClick={() => setRotate(prev => !prev)}
        >
            <div className={styles.front}>
                <button className={styles.cardVolume} onClick={e => {
                    e.stopPropagation();
                    speakMessage(text);
                }}>
                    <Volume />
                </button>

                {text}
            </div>

            <div className={styles.back}>
                <button className={styles.cardVolume} onClick={e => {
                    e.stopPropagation();
                    speakMessage(answer);
                }}>
                    <Volume />
                </button>

                {answer}
            </div>
        </div>
    )
}

export default Card;