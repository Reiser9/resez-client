import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { Pause, Play, Reload } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import TextPoint from '../../components/TextPoint';
import TestBlock from '../../components/TestBlock';

const Test = () => {
    const [isCountdown, setIsCountdown] = React.useState(true);

    return (
        <TitleWrapper pageTitle="ResEz - Решение теста">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={styles.test}>
                            <div className={styles.testContent}>
                                <TestBlock />
                                <TestBlock />
                                <TestBlock />
                                <TestBlock />
                            </div>

                            <div className={styles.testInfo}>
                                <div className={styles.testInfoContent}>
                                    <div className={styles.testInfoWrapper}>
                                        <TextPoint title="Прошло:" className={styles.testInfoItem}>
                                            <p className={typography.h4}>00:13:10</p>
                                        </TextPoint>

                                        <TextPoint title="Осталось:" className={styles.testInfoItem}>
                                            <p className={typography.h4}>03:16:50</p>
                                        </TextPoint>
                                    </div>

                                    <TextPoint title="Экзамен длится:">
                                        <p className={typography.h4}>3 часа 30 минут</p>
                                    </TextPoint>

                                    <TextPoint title="Предмет:">
                                        <p className={typography.h4}>Информатика</p>
                                    </TextPoint>
                                </div>

                                <div className={styles.testInfoButtons}>
                                    <button className={styles.testInfoButton} onClick={() => setIsCountdown(prev => !prev)}>
                                        {isCountdown ? <Pause /> : <Play />}

                                        {isCountdown ? "Пауза" : "Продолжить"}
                                    </button>

                                    <button className={`${styles.testInfoButton} ${styles.danger}`}>
                                        <Reload />

                                        Начать заново
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Test;