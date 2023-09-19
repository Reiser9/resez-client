import React from 'react';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Stats } from '../../../../components/Icons';

const AdminMain = () => {
    return (
        <div className={styles.admin}>
            <p className={typography.h3}>Статистика</p>

            <div className={styles.adminStats}>
                <div className={styles.adminStatsContent}>
                    <div className={styles.adminStatsItems}>
                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.info}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    423
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Зарегистрировано аккаунтов
                            </p>
                        </div>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.success}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    34
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Онлайн
                            </p>
                        </div>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.error}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    12
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Заблокировано аккаунтов
                            </p>
                        </div>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.warn}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    2
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Администраторов
                            </p>
                        </div>
                    </div>

                    <div className={styles.adminStatsIconInner}>
                        <Stats />
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default AdminMain;