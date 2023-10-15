import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import {ArrowRightLong} from '../../../../components/Icons';
import LinkBlock from '../../../../components/LinkBlock';

const TrainingMain = () => {
    return (
        <div className={styles.training}>
            <div className={styles.trainingTextInner}>
                <p className={typography.h3}>Тренинг для развития умственных способностей</p>

                <p className={typography.text}>
                    Здесь вы найдете разнообразные тренировки, которые помогут вам улучшить память, концентрацию, логическое мышление и другие когнитивные функции. Наши тренинги помогут вам стать более эффективным в учебе
                </p>
            </div>

            <div className={base.contentItems}>
                <LinkBlock to="memo" title="Тренировка памяти" text="Изучение материала эффективно и интерактивно, запоминай легко" />
                <LinkBlock to="battle" title="Битва знатоков" text="Соревнуйтесь в заданиях между пользователями сайта" disabled />
            </div>
        </div>
    )
}

export default TrainingMain;