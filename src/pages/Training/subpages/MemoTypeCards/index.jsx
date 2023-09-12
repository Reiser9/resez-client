import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import Card from '../../../../components/TrainingCard/Card';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';

const MemoTypeCards = () => {
    const [currentIdCard, setCurrentIdCard] = React.useState(0);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);

    const {collection} = useSelector(state => state.training);
    const navigate = useNavigate();
    const {id} = useParams();

    const wrongAnswer = () => {
        setCurrentIdCard(prev => prev + 1);
        setTotalWrong(prev => prev + 1);
    }

    const correctAnswer = () => {
        setCurrentIdCard(prev => prev + 1);
        setTotalCorrect(prev => prev + 1);
    }

    const restart = () => {
        setCurrentIdCard(0);
        setTotalCorrect(0);
        setTotalWrong(0);
    }

    React.useEffect(() => {
        if(Object.keys(collection).length === 0){
            navigate(`../memo/${id}`);
        }
    }, [id]);

    return (
        <div className={styles.typeCards}>
            <div className={styles.typeCardsWrapper}>
                <BackButton />

                <div className={styles.typeCardsTotal}>
                    {currentIdCard} / {collection.pairsCount}
                </div>
            </div>

            <div className={styles.typeCardsInner}>
                <div className={styles.typeCardsContent}>
                    {collection?.QAPairs?.map((data, id) => <Card
                        key={data.id}
                        data={data}
                        active={currentIdCard === id}
                        prev={currentIdCard === id + 1}
                        correctCallback={correctAnswer}
                        wrongCallback={wrongAnswer}
                    />)}
                </div>

                <div className={`${styles.typeCardsResult}${currentIdCard === collection.pairsCount ? ` ${styles.active}` : ""}`}>
                    <p className={typography.h3}>Ай красавчик!</p>

                    <p className={typography.text}>Твой результат:</p>

                    <p>Правильно: {totalCorrect}</p>
                    <p>Неверно: {totalWrong}</p>

                    <Button auto type="light" onClick={restart}>
                        Начать заново
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MemoTypeCards;