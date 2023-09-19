import React from 'react';
import { Link } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRightLong } from '../Icons';

import { formatDate } from '../../utils/formatDate';
import { getLogTypeByType } from '../../utils/getLogTypeByType';

const LogItem = ({data, loading}) => {
    const {message, date, logType, user, id} = data;
    const {nickname, avatar} = user;

    return (
        <div className={styles.logsItem}>
            <div className={styles.logsItemContent}>
                <div className={`${styles.logsItemTypeInner} ${getLogTypeByType(logType).class}`}>
                    {getLogTypeByType(logType).icon}
                </div>

                <div className={styles.logsItemInfo}>
                    <p className={`${typography.text2} ${styles.logsItemDate}`}>{formatDate(date)}</p>

                    <p className={`${typography.text} ${styles.logsItemEvent}`}>{message}</p>

                    <div className={styles.logsItemUserInner}>
                        <div className={styles.logsItemUserImgInner}>
                            {avatar
                            ? <img className={styles.logsItemUserImg} src={avatar} alt="avatar" />
                            :<p className={styles.logsItemUserLetter}>{nickname[0]}</p>}
                        </div>

                        <p className={typography.text2}>{nickname}</p>
                    </div>
                </div>
            </div>

            <Link to={`${id}`} className={styles.logsItemArrow}>
                <ArrowRightLong />
            </Link>
        </div>
    )
}

export default LogItem;