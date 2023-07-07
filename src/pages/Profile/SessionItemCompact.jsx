import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Desktop, Mobile } from '../../components/Icons';
import { formatDate } from '../../utils/formatDate';

const devices = {
    "desktop": <Desktop />,
    "phone": <Mobile />
}

const SessionItemCompact = ({current = false, data, ...props}) => {
    const {isActive, browser, deviceType, date} = data;

    return (
        <div className={`${styles.sessionItem} ${!isActive ? ` ${styles.disabled}` : ""}`} {...props}>
            <div className={styles.sessionItemContent}>
                <div className={styles.sessionItemIcon}>
                    {devices[deviceType]}
                </div>

                <div className={styles.sessionItemWrapper}>
                    {browser && <p className={typography.text}>Браузер {browser}</p>}

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