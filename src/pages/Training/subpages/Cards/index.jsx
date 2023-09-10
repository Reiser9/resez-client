import React from 'react';

import styles from './index.module.css';
import Card from './Card';

const Cards = () => {
    return (
        <div className={styles.cards}>
            <div className={styles.cardsContent}>
                <Card text="Как звали миллионера, который жил на пальме?" answer="Бабатумба" />
            </div>
        </div>
    )
}

export default Cards;