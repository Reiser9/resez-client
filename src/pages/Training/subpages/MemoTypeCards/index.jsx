import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import base from "../../../../styles/base.module.css";
import typography from "../../../../styles/typography.module.css";
import styles from "./index.module.css";

import { Return } from "../../../../components/Icons";

import Card from "../../../../components/TrainingCard/Card";
import BackButton from "../../../../components/BackButton";
import Button from "../../../../components/Button";
import IconButton from "../../../../components/IconButton";

const offsetTranslateCard = 125;

const MemoTypeCards = () => {
    const [currentIdCard, setCurrentIdCard] = React.useState(0);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);
    const [prevAnswer, setPrevAnswer] = React.useState(null);
    const [isProcessPlaying, setIsProcessPlaying] = React.useState(false);

    const { collection } = useSelector((state) => state.training);
    const navigate = useNavigate();
    const { id } = useParams();

    const wrongAnswer = () => {
        setCurrentIdCard((prev) => prev + 1);
        setTotalWrong((prev) => prev + 1);
        setPrevAnswer(false);
    };

    const correctAnswer = () => {
        setCurrentIdCard((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setPrevAnswer(true);
    };

    const restart = () => {
        setCurrentIdCard(0);
        setTotalCorrect(0);
        setTotalWrong(0);
        setPrevAnswer(null);
        setIsProcessPlaying(true);
    };

    const returnPrevSlide = () => {
        if (prevAnswer) {
            setTotalCorrect((prev) => prev - 1);
        } else {
            setTotalWrong((prev) => prev - 1);
        }

        if (currentIdCard > 0) {
            if (currentIdCard === 1) {
                setPrevAnswer(null);
            }

            setCurrentIdCard((prev) => prev - 1);
        }
    };

    React.useEffect(() => {
        if (Object.keys(collection).length === 0) {
            navigate(`../memo/${id}`);
        }
    }, [id]);

    React.useEffect(() => {
        if (currentIdCard === collection.pairsCount) {
            setIsProcessPlaying(false);
        } else {
            setIsProcessPlaying(true);
        }
    }, [currentIdCard, collection]);

    return (
        <div className={`${base.baseWrapperGap16} ${styles.typeCardsOuter}`}>
            <div className={styles.typeCardsWrapper}>
                <BackButton />

                <div className={styles.typeCardsTotal}>
                    {currentIdCard} / {collection.pairsCount}
                </div>
            </div>

            <div className={styles.typeCardsInner}>
                <div className={styles.typeCardsContent}>
                    {collection?.QAPairs?.map((data, id) => (
                        <Card
                            key={data.id}
                            data={data}
                            active={currentIdCard === id}
                            prev={currentIdCard === id + 1}
                            correctCallback={correctAnswer}
                            wrongCallback={wrongAnswer}
                        />
                    ))}
                </div>

                <div
                    className={`${styles.typeCardsResult}${
                        currentIdCard === collection.pairsCount
                            ? ` ${styles.active}`
                            : ""
                    }`}
                >
                    <p className={typography.h3}>Отлично!</p>

                    <p className={typography.text}>Твой результат:</p>

                    <p>Правильно: {totalCorrect}</p>
                    <p>Неверно: {totalWrong}</p>

                    <Button auto type="light" onClick={restart}>
                        Начать заново
                    </Button>
                </div>
            </div>

            <div
                className={`${styles.typeCardsEvents}${
                    isProcessPlaying ? ` ${styles.active}` : ""
                }`}
            >
                <IconButton
                    small
                    onClick={returnPrevSlide}
                    disabled={currentIdCard <= 0}
                >
                    <Return />
                </IconButton>
            </div>
        </div>
    );
};

export default MemoTypeCards;
