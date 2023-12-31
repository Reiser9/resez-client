import React from 'react';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { CONFIG } from '../../consts/CONFIG';

import { Notify, Phone, Stop, Verified } from '../Icons';

import { maskPhone } from '../../utils/formatPhone';
import {formatDate} from '../../utils/formatDate';

import useUtils from '../../hooks/useUtils';

import Button from '../Button';
import IconButton from '../IconButton';
import TextPoint from '../TextPoint';
import ModalConfirm from '../Modal/ConfirmModal';
import LoaderForItem from '../LoaderForItem';

const UserItem = ({
    data,
    loading = false,
    userBlock = () => {},
    userUnblock = () => {},
    notify = false,
    block = false
}) => {
    const {avatar, isBlocked, isVerified, level, xp, xpLimit, nickname, phoneNumber, theme, roles, id, firstName,
        lastName, status, registrationDate, isOnline, lastActivity} = data;
    const {user} = useSelector(state => state.user);
    const {settings, id: userId} = user || {};
    const {isShowAvatars} = settings || {};

    const [confirmBlock, setConfirmBlock] = React.useState(false);
    const [confirmUnblock, setConfirmUnblock] = React.useState(false);

    const {copyTextWithNotify} = useUtils();

    return (
        <>
            <div className={styles.userItem}>
                <div className={styles.userInfoInner}>
                    <div className={styles.userAvatarInner}>
                        {(avatar && (!isShowAvatars || userId === id))
                        ? <img src={avatar} alt="avatar" className={styles.userAvatar} />
                        : nickname
                            ? <p className={styles.userAvatarName}>{nickname[0]}</p>
                            : <p className={styles.userAvatarName}>No</p>}

                        {isOnline
                        ? <Tooltip title="Онлайн">
                            <div className={styles.userOnline}></div>
                        </Tooltip>
                        : <Tooltip title="Оффлайн">
                            <div className={styles.userOffline}></div>
                        </Tooltip>}

                        {isVerified && <Tooltip title="Верифицирован">
                            <div className={styles.userVerified}>
                                <Verified className={styles.userVerifiedIcon} />
                            </div>
                        </Tooltip>}
                    </div>

                    <div className={styles.userInfo}>
                        {firstName && lastName && <p className={`${typography.text} ${styles.userInfoName}`}>{`${firstName} ${lastName}`}</p>}

                        {nickname && <Tooltip title="Скопировать">
                            <p className={`${typography.text2} ${styles.userInfoNickname}`} onClick={() => copyTextWithNotify(nickname, "Имя пользователя скопировано")}>{nickname}</p>
                        </Tooltip>}
                    </div>
                </div>

                <div className={base.baseWrapperGap12}>
                    <div className={base.titleInnerNowrap}>
                        {id && <TextPoint title="ID" text={id} />}

                        {theme && <TextPoint title="Тема:">
                            <div className={styles.userThemeCircle} style={{background: theme?.primary || CONFIG.BASE_COLOR}}></div>
                        </TextPoint>}
                    </div>
                    
                    {status && <TextPoint title="Статус" text={status} />}
                    {phoneNumber && <TextPoint title="Номер телефона" text={maskPhone(phoneNumber)} />}
                    {!isOnline && <TextPoint title="Был(а) в сети" text={lastActivity ? formatDate(lastActivity) : "Неизвестно"} />}
                    {registrationDate && <TextPoint title="Дата регистрации" text={formatDate(registrationDate, "DD.MM.YYYY в HH:mm")} />}

                    {roles?.length > 0 && <TextPoint title="Роли">
                        <div className={styles.userRoles}>
                            {roles.map((data, id) => <p key={id} className={styles.userRole} style={{color: data?.textColor || CONFIG.BASE_COLOR, background: data?.backgroundColor || CONFIG.BASE_COLOR}}>{data.role}</p>)}
                        </div>
                    </TextPoint>}
                </div>

                <div className={styles.userItemWrapper}>
                    <div className={styles.userLvlInner}>
                        <p className={styles.userLvlPoint}>{level || 1}</p>

                        <div className={styles.userLvlProgressTotal}>
                            <div className={styles.userLvlProgressLine} style={{width: `${(xp / xpLimit) * 100}%`}}></div>

                            <p className={`${typography.text3} ${styles.userLvlExp}`}>{xp || 0} / {xpLimit || 0}</p>
                        </div>

                        <p className={styles.userLvlPoint}>{(level || 1) + 1}</p>
                    </div>

                    <div className={styles.userItemButtons}>
                        {/* <Button type="light">
                            Подробнее
                        </Button> */}

                        {!isBlocked && (notify || block) && <>
                            {/* {notify && <Tooltip title="Уведомление">
                                <IconButton type="light" className={styles.userItemButtonIcons}>
                                    <Notify />
                                </IconButton>
                            </Tooltip>} */}

                            {block && <Tooltip title="Заблокировать">
                                <IconButton type="danger" className={styles.userItemButtonIcons} onClick={() => setConfirmBlock(true)}>
                                    <Stop />
                                </IconButton>
                            </Tooltip>}
                        </>}
                    </div>
                </div>

                {isBlocked && <div className={styles.userItemBlock}>
                    <p className={`${typography.text} ${styles.userItemBlockText}`}>Пользователь заблокирован</p>

                    <Button onClick={() => setConfirmUnblock(true)}>Разблокировать</Button>
                </div>}

                {loading && <LoaderForItem />}
            </div>

            <ModalConfirm
                value={confirmBlock}
                setValue={setConfirmBlock}
                text={`Вы действительно хотите заблокировать пользователя ${nickname || ""}`}
                confirmText="Заблокировать"
                rejectText="Отмена"
                callback={userBlock}
            />

            <ModalConfirm
                value={confirmUnblock}
                setValue={setConfirmUnblock}
                text={`Вы действительно хотите разблокировать пользователя ${nickname || ""}`}
                confirmText="Разблокировать"
                rejectText="Отмена"
                callback={userUnblock}
            />
        </>
    )
}

export default UserItem;