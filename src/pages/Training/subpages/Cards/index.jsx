import React from 'react';

import styles from './index.module.css';
import Card from './Card';

const Cards = () => {
    return (
        <div className={styles.cards}>
            <div className={styles.cardsContent}>
                {/* <Card text="Как звали миллионера, который жил на пальме? Так вот, его имя Девид Бэкхам, я его видел вчера вечером в пивнушке Буксир" answer="Бабатумба" />
                <Card text="Деньги пахнут пуси а, стринги ...?" answer="...пахнут" /> */}
                <Card text="Коронная фраза Мурада шерстяного" answer="ЯХАА БАЛЯ" />
            </div>
        </div>
    )
}

export default Cards;