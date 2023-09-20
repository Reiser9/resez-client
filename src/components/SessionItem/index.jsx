import React from 'react';
import { Tooltip } from 'antd';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import {formatDate} from '../../utils/formatDate';
import {getDeviceByName} from '../../utils/getDeviceByName';

import Button from '../Button';
import ConfirmModal from '../Modal/ConfirmModal';
import TextPoint from '../TextPoint';

const SessionItem = ({current = false, data, active, callback = () => {}, loading = false}) => {
    const {isActive, browser, deviceType, date, ip, country, city, browserVersion, os, platform, id} = data;

    const [confirmEndSession, setConfirmEndSession] = React.useState(false);

    return (
        <>
            <div data-session={id} className={`${base.item3} ${styles.sessionItem}${!isActive ? ` ${styles.disabled}` : ""}${active ? ` ${styles.active}` : ""}`}>
                <Tooltip title={getDeviceByName(deviceType)?.name}>
                    <div className={styles.sessionItemIcon}>
                        {getDeviceByName(deviceType)?.icon}
                    </div>
                </Tooltip>

                <div className={`${styles.sessionItemPoints} ${base.baseWrapperGap12}`}>
                    <div className={base.baseWrapperGap0}>
                        <p className={`${typography.text3} ${styles.sessionItemPointTitle}`}>Статус</p>

                        {current
                        ? <p className={`${typography.text} ${styles.currentSession}`}>Текущий сеанс</p>
                        : <p className={typography.text}>{isActive ? "Активный" : "Завершен"}</p>}
                    </div>

                    <TextPoint title="Браузер" text={browser ? `${browser} ${browserVersion}` : "Неопределен"} />
                    <TextPoint title="Операционная система" text={os ? os : "Неопределена"} />
                    <TextPoint title="Платформа" text={platform ? platform : "Неопределена"} />
                    <TextPoint title="IP адрес" text={ip ? ip : "Неопределен"} />
                    {(country || city)  && <TextPoint title="Местоположение" text={`${city} ${country}`} />}
                    <TextPoint title="Дата" text={formatDate(date)} />
                </div>
                
                {isActive
                ? <Button loading={loading} type="empty" theme="danger" className={styles.sessionItemButton} onClick={() => setConfirmEndSession(true)}>
                    Завершить сеанс
                </Button>
                : <div className={styles.sessionItemEnded}>
                    Сеанс завершен
                </div>}
            </div>

            <ConfirmModal
                value={confirmEndSession}
                setValue={setConfirmEndSession}
                callback={callback}
                text="Вы действительно хотите завершить данный сеанс?"
                confirmText="Завершить"
                rejectText="Отмена"
            />
        </>
    )
}

export default SessionItem;