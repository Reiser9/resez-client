import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Stats } from '../../../../components/Icons';

import {socket} from '../../../../utils/socket';
import {formatDate} from '../../../../utils/formatDate';

import { setAdminStats } from '../../../../redux/slices/admin';
import { Tooltip } from 'antd';

const AdminMain = () => {
    const {adminStats} = useSelector(state => state.admin);
    const dispatch = useDispatch();

    React.useEffect(() => {
        socket.emit("stats");
        socket.on("stats", (data) => {
            dispatch(setAdminStats(data));
        });

        return () => {
            socket.off("stats");
        }
    }, []);

    const {accountsCount, blockedAccountsCount, adminsCount, totalOnline, authUsersOnline,
        maxTotalOnline, maxOnlinePerDay, maxOnlinePerDayDate, maxTotalOnlineDate} = adminStats || {};

    return (
        <div className={base.baseWrapperGap16}>
            <p className={typography.h3}>Статистика</p>

            <div className={styles.adminStats}>
                <div className={styles.adminStatsContent}>
                    <div className={styles.adminStatsItems}>
                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.success}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    {totalOnline || 0}
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Общий онлайн
                            </p>
                        </div>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.success}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    {authUsersOnline || 0}
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Онлайн авторизованных
                            </p>
                        </div>

                        <Tooltip title={formatDate(maxTotalOnlineDate, "D MMMM YYYY")}>
                            <div className={styles.adminStatsItem}>
                                <div className={`${styles.adminStatsNumberInner} ${styles.success}`}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>
                                        {maxTotalOnline || 0}
                                    </p>
                                </div>

                                <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                    Максимальный онлайн
                                </p>
                            </div>
                        </Tooltip>

                        <Tooltip title={formatDate(maxOnlinePerDayDate)}>
                            <div className={styles.adminStatsItem}>
                                <div className={`${styles.adminStatsNumberInner} ${styles.success}`}>
                                    <div className={styles.adminStatsCircle}></div>

                                    <p className={styles.adminStatsNumber}>
                                        {maxOnlinePerDay || 0}
                                    </p>
                                </div>

                                <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                    Максимальный онлайн за день
                                </p>
                            </div>
                        </Tooltip>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.info}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    {accountsCount || 0}
                                </p>
                            </div>

                            <p className={`${typography.text2} ${styles.adminStatsItemText}`}>
                                Зарегистрировано аккаунтов
                            </p>
                        </div>

                        <div className={styles.adminStatsItem}>
                            <div className={`${styles.adminStatsNumberInner} ${styles.error}`}>
                                <div className={styles.adminStatsCircle}></div>

                                <p className={styles.adminStatsNumber}>
                                    {blockedAccountsCount || 0}
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
                                    {adminsCount || 0}
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