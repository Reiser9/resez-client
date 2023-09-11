import React from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './index.module.css';

import CardPart from './CardPart';

const offsetTranslateCard = 125;

const Card = ({text = "", answer = "", wrongText = "Не знаю", correctText = "Знаю"}) => {
    const [rotate, setRotate] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0, rotate: 0 });
    const [correct, setCorrect] = React.useState(0);
    const [wrong, setWrong] = React.useState(0);

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            speechSynthesis.cancel();
        };
      
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            handleBeforeUnload();
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, []);

    // Карточка
    const clearCard = () => {
        setPosition({
            x: 0,
            y: 0,
            rotate: 0
        });

        setIsDragging(false);
        setCorrect(0);
        setWrong(0);
    }

    const handlers = useSwipeable({
        onSwipeStart: () => {
            setIsDragging(true);
        },
        onSwiping: (data) => {
            const {deltaX, deltaY} = data;

            setPosition({
                x: deltaX,
                y: deltaY,
                rotate: deltaX / 18
            });

            if(deltaX > 0){
                setCorrect(deltaX > offsetTranslateCard ? 1 : deltaX / offsetTranslateCard);
                setWrong(0);
            }
            else{
                setWrong(deltaX < -offsetTranslateCard ? 1 : -deltaX / offsetTranslateCard);
                setCorrect(0);
            }
        },
        onSwiped: (data) => {
            const {deltaX} = data;

            deltaX > offsetTranslateCard ? console.log("Вправо") : deltaX < -offsetTranslateCard && console.log("Влево");

            clearCard();
        },
        onTap: () => {
            setRotate(prev => !prev);
        },
        onTouchEndOrOnMouseUp: () => {
            clearCard();
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const myRef = React.useRef();

    const refPassthrough = (el) => {
        handlers.ref(el);

        myRef.current = el;
    }

    const rotateHandler = () => {
        setRotate(prev => !prev);
    }

    return (
        <div className={`${styles.card}${!isDragging ? ` ${styles.cardTransition}` : ""}${rotate ? ` ${styles.rotate}` : ""}`} {...handlers} ref={refPassthrough}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                transform: `rotate(${position.rotate}deg) perspective(600px)${rotate ? " rotateY(180deg)" : ""}`,
                userSelect: "none",
                cursor: "grab"
            }}
        >
            <CardPart onClick={rotateHandler} text={text} className={styles.front} />
            <CardPart onClick={rotateHandler} text={answer} className={styles.back} />

            <div className={`${styles.verdict} ${styles.wrong}${!isDragging ? ` ${styles.cardTransition}` : ""}`} style={{opacity: wrong}}>
                {wrongText}
            </div>

            <div className={`${styles.verdict} ${styles.correct}${!isDragging ? ` ${styles.cardTransition}` : ""}`} style={{opacity: correct}}>
                {correctText}
            </div>
        </div>
    )
}

export default Card;