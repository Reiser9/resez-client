import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Notify, Stop } from '../Icons';

import useUtils from '../../hooks/useUtils';

import Button from '../Button';
import IconButton from '../IconButton';
import TextPoint from '../TextPoint';
import ModalConfirm from '../Modal/ConfirmModal';
import Preloader from '../Preloader';

const UserItem = ({data, loading = false, userBlock = () => {}, userUnblock = () => {}}) => {
    const {avatar, isBlocked, isVerified, level, xp, xpLimit, nickname, phoneNumber, theme, roles, id} = data;

    const [confirmBlock, setConfirmBlock] = React.useState(false);
    const [confirmUnblock, setConfirmUnblock] = React.useState(false);

    const {copyTextWithNotify} = useUtils();

    return (
        <>
            <div className={styles.userItem}>
                <div className={styles.userInfoInner}>
                    <div className={styles.userAvatarInner}>
                        {avatar
                        ? <img src={avatar} alt="avatar" className={styles.userAvatar} />
                        : nickname && <p className={styles.userAvatarName}>{nickname[0].toUpperCase()}</p>}

                        <Tooltip title="Тема пользователя">
                            <div className={styles.userThemeCircle} style={{background: theme?.primary || "#007cee"}}></div>
                        </Tooltip>
                    </div>

                    <div className={styles.userInfo}>
                        <p className={`${typography.text} ${styles.userInfoName}`}>Алексей Зубков</p>

                        <Tooltip title="Скопировать">
                            <p className={`${typography.text2} ${styles.userInfoNickname}`} onClick={() => copyTextWithNotify(nickname)}>{nickname}</p>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.userPoints}>
                    <TextPoint title="ID" text={id} />
                    <TextPoint title="Статус" text="Новичек" />
                    {phoneNumber && <TextPoint title="Номер телефона" text={phoneNumber} />}

                    {roles.length > 0 && <TextPoint title="Роли">
                        <div className={styles.userRoles}>
                            {roles.map((data, id) => <p key={id} className={styles.userRole} style={{color: "#EE7200", background: "#EE72001A"}}>{data.role}</p>)}
                        </div>
                    </TextPoint>}
                </div>

                <div className={styles.userItemWrapper}>
                    <div className={styles.userLvlInner}>
                        <p className={styles.userLvlPoint}>{level}</p>

                        <div className={styles.userLvlProgressTotal}>
                            <div className={styles.userLvlProgressLine} style={{width: xp / xpLimit}}></div>

                            <p className={`${typography.text3} ${styles.userLvlExp}`}>{xp} / {xpLimit}</p>
                        </div>

                        <p className={styles.userLvlPoint}>{level + 1}</p>
                    </div>

                    <div className={styles.userItemButtons}>
                        <Button type="light">
                            Подробнее
                        </Button>

                        {!isBlocked && <>
                            <Tooltip title="Уведомление">
                                <IconButton type="light">
                                    <Notify />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Заблокировать">
                                <IconButton type="danger" onClick={() => setConfirmBlock(true)}>
                                    <Stop />
                                </IconButton>
                            </Tooltip>
                        </>}
                    </div>
                </div>

                {isBlocked && <div className={styles.userItemBlock}>
                    <p className={`${typography.text} ${styles.userItemBlockText}`}>Пользователь заблокирован</p>

                    <Button onClick={() => setConfirmUnblock(true)}>Разблокировать</Button>
                </div>}

                {loading && <div className={styles.userItemLoader}>
                    <Preloader small />
                </div>}
            </div>

            <ModalConfirm
                value={confirmBlock}
                setValue={setConfirmBlock}
                text={`Вы действительно хотите заблокировать пользователя ${nickname && nickname}`}
                confirmText="Заблокировать"
                rejectText="Отмена"
                callback={userBlock}
            />

            <ModalConfirm
                value={confirmUnblock}
                setValue={setConfirmUnblock}
                text={`Вы действительно хотите разблокировать пользователя ${nickname && nickname}`}
                confirmText="Разблокировать"
                rejectText="Отмена"
                callback={userUnblock}
            />
        </>
    )
}

export default UserItem;