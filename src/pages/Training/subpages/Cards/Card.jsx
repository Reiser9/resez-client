import React from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './index.module.css';

const Card = ({text = "", answer = ""}) => {
    const [rotate, setRotate] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [callback, setCallback] = React.useState("");
    const [position, setPosition] = React.useState({ x: 0, y: 0, rotate: 0 });
    const [color, setColor] = React.useState({r: 0, g: 0, b: 0});

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
                {text}
            </div>

            <div className={styles.back}>
                {answer}
            </div>
        </div>
    )
}

export default Card;