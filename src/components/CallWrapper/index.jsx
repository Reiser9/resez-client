import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { CALL_STATUSES } from '../../consts/CALL_STATUSES';

import { Cross, Desktop, Microphone, Phone, Video } from '../Icons';

import useCalls from '../../hooks/useCalls';

import IconButton from '../IconButton';

const CallWrapper = () => {
    const [isCollapse, setIsCollapse] = React.useState(false);

    const {callStatus, callInfo} = useSelector(state => state.call);
    const {medias, acceptCall} = useCalls();

    const {user, callId} = callInfo;
    const {id, nickname, avatar, firstName, lastName} = user || {};

    return (
        <div className={`${styles.callOverlay}${callStatus !== CALL_STATUSES.DEFAULT ? ` ${styles.active}` : ""}${isCollapse ? ` ${styles.collapse}` : ""}`} onClick={() => setIsCollapse(true)}>
            <div className={`${callStatus === CALL_STATUSES.INCOMING ? styles.callWrapper : styles.callWrapperBig}`}>
                <div className={`${styles.callContent}${callStatus !== CALL_STATUSES.DEFAULT ? ` ${styles.active}` : ""}`} onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapse(false);
                }}>
                    <div className={`${base.circle75} ${(callStatus === CALL_STATUSES.INCOMING || callStatus === CALL_STATUSES.OUTCOMING) ? styles.callAvatar : ""}`}>
                        {avatar
                        ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                        : nickname ? nickname[0] : "Х"}
                    </div>

                    {(firstName || lastName) && <p className={typography.h4}>{lastName} {firstName}</p>}

                    {callStatus === CALL_STATUSES.PROCESS && <p className={styles.subText}>00:31</p>}
                    {callStatus === CALL_STATUSES.OUTCOMING && <p className={styles.subText}>Ожидание подключения пользователя...</p>}
                    {callStatus === CALL_STATUSES.REJECTED && <p className={styles.subText}>Вызов отклонен</p>}
                    {callStatus === CALL_STATUSES.ENDED && <p className={styles.subText}>Вызов завершен</p>}
                    {callStatus === CALL_STATUSES.TALKING && <p className={styles.subText}>Пользователь разговаривает</p>}

                    {callStatus === CALL_STATUSES.PROCESS && <>
                        
                    </>}

                    {callStatus === CALL_STATUSES.INCOMING && <>
                        <p className={styles.subText}>Входящий звонок</p>

                        <div className={styles.callButtons}>
                            <IconButton type="light" onClick={() => acceptCall(callId, id)}>
                                <Phone />
                            </IconButton>

                            <IconButton type="danger">
                                <Cross />
                            </IconButton>
                        </div>
                    </>}

                    {callStatus !== CALL_STATUSES.INCOMING && <div className={styles.callButtonsNear}>
                        <IconButton type="light">
                            <Microphone />
                        </IconButton>

                        <IconButton type="light">
                            <Video />
                        </IconButton>

                        <IconButton type="light">
                            <Desktop />
                        </IconButton>

                        <IconButton type="danger">
                            <Cross />
                        </IconButton>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default CallWrapper;