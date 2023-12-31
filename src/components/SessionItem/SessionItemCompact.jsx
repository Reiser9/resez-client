import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { formatDate } from '../../utils/formatDate';
import { getDeviceByName } from '../../utils/getDeviceByName';

const SessionItemCompact = ({current = false, data, ...props}) => {
    const {isActive, browser, deviceType, date} = data;

    return (
        <div className={`${styles.sessionItemCompact} ${!isActive ? ` ${styles.disabled}` : ""}`} {...props}>
            <div className={styles.sessionItemContent}>
                <div className={styles.sessionItemCompactIcon}>
                    {getDeviceByName(deviceType)?.icon}
                </div>

                <div className={styles.sessionItemWrapper}>
                    <p className={typography.text}>Браузер {browser ? browser : "неопределен"}</p>

                    {date && <p className={`${typography.text2} ${styles.sessionItemDate}`}>{formatDate(date)}</p>}
                </div>
            </div>

            {current && <p className={`${typography.text2} ${styles.sessionActive}`}>
                Активный
            </p>}

            {!isActive && <p className={`${typography.text2} ${styles.sessionActive}`}>
                Завершен
            </p>}
        </div>
    )
}

export default SessionItemCompact;