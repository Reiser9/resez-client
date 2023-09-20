import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import {ArrowRightLong} from '../../../../components/Icons';

const TrainingMain = () => {
    return (
        <div className={styles.training}>
            <div className={styles.trainingTextInner}>
                <p className={typography.h3}>Тренинг для развития умственных способностей</p>

                <p className={typography.text}>
                    Здесь вы найдете разнообразные тренировки, которые помогут вам улучшить память, концентрацию, логическое мышление и другие когнитивные функции. Наши тренинги помогут вам стать более эффективным в учебе.
                </p>
            </div>

            <div className={base.contentItems}>
                <Link to="memo" className={`${base.item3} ${styles.trainingItem}`}>
                    <span className={styles.trainingItemTitleInner}>
                        <p className={typography.h4}>Тренировка памяти</p>

                        <span className={styles.trainingItemArrow}>
                            <ArrowRightLong />
                        </span>
                    </span>

                    <p className={typography.text2}>
                        Изучение материала эффективно и интерактивно, запоминай легко!
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default TrainingMain;