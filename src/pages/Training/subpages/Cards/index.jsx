import React from 'react';
import {useSelector} from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useTraining from '../../../../hooks/useTraining';

import Card from '../../../../components/TrainingCard/Card';
import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import NotContent from '../../../../components/NotContent';
import { Cross } from '../../../../components/Icons';

const cardsArr = [
    {
        id: 1,
        text: "Как звали миллионера, который жил на пальме? Так вот, его имя Девид Бэкхам, я его видел вчера вечером в пивнушке Буксир",
        answer: "Бабатумба"
    },
    {
        id: 2,
        text: "Деньги пахнут пуси а, стринги ...?",
        answer: "...пахнут"
    },
    {
        id: 3,
        text: "Коронная фраза Мурада шерстяного",
        answer: "ЯХА БАЛЯ"
    },
    {
        id: 4,
        text: "Как звали миллионера, который жил на пальме? Так вот, его имя Девид Бэкхам, я его видел вчера вечером в пивнушке Буксир",
        answer: "Бабатумба"
    },
    {
        id: 5,
        text: "Деньги пахнут пуси а, стринги ...?",
        answer: "...пахнут"
    },
    {
        id: 6,
        text: "Коронная фраза Мурада шерстяного",
        answer: "ЯХА БАЛЯ"
    }
];

const Cards = () => {
    const [currentIdCard, setCurrentIdCard] = React.useState(1);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [totalWrong, setTotalWrong] = React.useState(0);

    const {error, isLoading, loadCollections} = useTraining();
    const {collections} = useSelector(state => state.training);

    const wrongAnswer = () => {
        setCurrentIdCard(prev => prev + 1);
        setTotalWrong(prev => prev + 1);
    }

    const correctAnswer = () => {
        setCurrentIdCard(prev => prev + 1);
        setTotalCorrect(prev => prev + 1);
    }

    React.useEffect(() => {
        loadCollections();
    }, []);

    return (
        <div className={styles.cards}>
            <div className={styles.cardsWrapper}>
                <div className={styles.cardsTitleInner}>
                    <p className={typography.h3}>Коллекции (3)</p>

                    <ReloadButton />
                </div>

                <Button type="light" auto to="add">
                    Добавить
                </Button>
            </div>

            {isLoading
            ? <div className={styles.collectionsContent}>
                Загрузка...
            </div>
            : error ? <NotContent text="Ошибка при загрузке коллекций" icon={<Cross />} danger />
            : collections?.collections?.length > 0 ? <div className={styles.collectionsContent}>
                {collections?.collections?.map((data, id) => <div key={id}>{data.collection}</div>)}
            </div>
            : <NotContent text="Коллекций не найдено" />}

            <div className={styles.cardsContent}>
                {cardsArr.map((data, id) => <Card
                    key={data.id}
                    data={data}
                    active={currentIdCard === id + 1}
                    prev={currentIdCard - 1 === id + 1}
                    correctCallback={correctAnswer}
                    wrongCallback={wrongAnswer}
                />)}
            </div>
        </div>
    )
}

export default Cards;