import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './subpages/Safe/index.module.css';

import { formatDate } from '../../utils/formatDate';
import {getDeviceByName} from '../../utils/getDeviceByName';

import Button from '../../components/Button';

const SessionItem = ({current = false, data, active, callback = () => {}, loading = false}) => {
    const {isActive, browser, deviceType, date, ip, country, city, browserVersion, os, platform, id} = data;

    return (
        <div data-session={id} className={`${styles.sessionItem}${!isActive ? ` ${styles.disabled}` : ""}${active ? ` ${styles.active}` : ""}`}>
            <Tooltip title={getDeviceByName(deviceType)?.name}>
                <div className={styles.sessionItemIcon}>
                    {getDeviceByName(deviceType)?.icon}
                </div>
            </Tooltip>

            <div className={styles.sessionItemPoints}>
                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Статус</p>

                    {current
                    ? <p className={`${typography.text} ${styles.currentSession}`}>Текущий сеанс</p>
                    : <p className={typography.text}>{isActive ? "Активный" : "Завершен"}</p>}
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Браузер</p>

                    <p className={typography.text}>{browser} {browserVersion}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Операционная система</p>

                    <p className={typography.text}>{os ? os : "Неопределена"}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Платформа</p>

                    <p className={typography.text}>{platform ? platform : "Неопределена"}</p>
                </div>

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>IP адрес</p>

                    <p className={typography.text}>{ip ? ip : "Неопределен"}</p>
                </div>

                {(country || city)  && <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Местоположение</p>

                    <p className={typography.text}>{city} {country}</p>
                </div>}

                <div className={styles.sessionItemPoint}>
                    <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Дата</p>

                    <p className={typography.text}>{formatDate(date)}</p>
                </div>
            </div>
            
            {isActive
            ? <Button loading={loading} type="empty" theme="danger" className={styles.sessionItemButton} onClick={callback}>
                Завершить сеанс
            </Button>
            : <div className={styles.sessionItemEnded}>
                Сеанс завершен
            </div>}
        </div>
    )
}

export default SessionItem;