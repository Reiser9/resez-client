import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './subpages/Safe/index.module.css';

import { Desktop, Mobile } from '../../components/Icons';

import { formatDate } from '../../utils/formatDate';

import Button from '../../components/Button';

const devices = {
    "desktop": <Desktop />,
    "phone": <Mobile />
}

const SessionItem = ({current = false, data}) => {
    const {isActive, browser, deviceType, date, ip, country, city, browserVersion, os, platform} = data;

    return (
        <div className={`${styles.sessionItem}${!isActive ? ` ${styles.disabled}` : ""}`}>
            <div className={styles.sessionItemIcon}>
                {devices[deviceType]}
            </div>

            <div className={styles.sessionItemPoints}>
                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Статус</p>

                    {current
                    ? <p className={`${typography.text} ${styles.currentSession}`}>Текущая сессия</p>
                    : <p className={typography.text}>{isActive ? "Активная" : "Завершена"}</p>}
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Браузер</p>

                    <p className={typography.text}>{browser} {browserVersion}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Операционная система</p>

                    <p className={typography.text}>{os}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Платформа</p>

                    <p className={typography.text}>{platform}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>IP адрес</p>

                    <p className={typography.text}>{ip}</p>
                </div>

                {country !== "unknown" && <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Местоположение</p>

                    <p className={typography.text}>{country}, {city}</p>
                </div>}

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Дата</p>

                    <p className={typography.text}>{formatDate(date)}</p>
                </div>
            </div>
            
            {isActive
            ? <Button type="empty" theme="danger" className={styles.sessionItemButton}>
                Завершить сессию
            </Button>
            : <div className={styles.sessionItemEnded}>
                Сессия завершена
            </div>}
        </div>
    )
}

export default SessionItem;