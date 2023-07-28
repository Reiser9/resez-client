import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Notify, Stop } from '../Icons';

import Button from '../Button';
import IconButton from '../IconButton';
import TextPoint from '../TextPoint';

import useUtils from '../../hooks/useUtils';

const UserItem = ({data}) => {
    const {avatar, isBlocked, isVerified, level, nickname, phoneNumber, theme} = data;

    const {copyTextWithNotify} = useUtils();

    return (
        <div className={styles.userItem}>
            <div className={styles.userInfoInner}>
                <div className={styles.userAvatarInner}>
                    {avatar
                    ? <img src={avatar} alt="avatar" className={styles.userAvatar} />
                    : nickname && <p className={styles.userAvatarName}>{nickname[0].toUpperCase()}</p>}

                    <Tooltip title="Тема пользователя">
                        <div className={styles.userThemeCircle} style={{background: theme.primary}}></div>
                    </Tooltip>
                </div>

                <div className={styles.userInfo}>
                    <p className={`${typography.text} ${styles.userInfoName}`}>Алексей Зубков</p>

                    <Tooltip title="Скопировать" placement="bottom">
                        <p className={`${typography.text2} ${styles.userInfoNickname}`} onClick={() => copyTextWithNotify(nickname)}>{nickname}</p>
                    </Tooltip>
                </div>
            </div>

            <div className={styles.userPoints}>
                <TextPoint title="Статус" text="Новичек" />

                {phoneNumber && <TextPoint title="Номер телефона" text={phoneNumber} />}

                <TextPoint title="Роли">
                    <div className={styles.userRoles}>
                        <p className={styles.userRole} style={{color: "#EE7200", background: "#EE72001A"}}>Админ</p>
                        <p className={styles.userRole} style={{color: "#007CEE", background: "#007CEE1A"}}>Модератор</p>
                        <p className={styles.userRole} style={{color: "#BE00EE", background: "#BE00EE1A"}}>Роль без названия</p>
                    </div>
                </TextPoint>
            </div>

            <div className={styles.userItemWrapper}>
                <div className={styles.userLvlInner}>
                    <p className={styles.userLvlPoint}>{level}</p>

                    <div className={styles.userLvlProgressTotal}>
                        <div className={styles.userLvlProgressLine} style={{width: "45%"}}></div>

                        <p className={`${typography.text3} ${styles.userLvlExp}`}>175 / 1000</p>
                    </div>

                    <p className={styles.userLvlPoint}>{level + 1}</p>
                </div>

                <div className={styles.userItemButtons}>
                    <Button type="light">
                        Подробнее
                    </Button>

                    <Tooltip title="Уведомление">
                        <IconButton type="light">
                            <Notify />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Заблокировать">
                        <IconButton type="danger">
                            <Stop />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default UserItem;