import React from 'react';
import { Tooltip } from 'antd';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Archive, Delete, DotsHorizontal, Enter, Mute, Pin } from '../Icons';
import IconButton from '../IconButton';

const DialogItem = ({
    date,
    name,
    mute = false,
    from = "",
    lastMessage
}) => {
    return (
        <div className={styles.dialogItem}>
            <div className={base.circle50}>
                {name[0]}
            </div>

            <div className={styles.dialogItemTextInner}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={styles.dialogItemName}>{name}</p>

                        {mute && <Mute className={styles.dialogItemMute} />}
                    </div>

                    <p className={styles.dialogItemDate}>{date}</p>
                </div>

                <div className={base.titleInnerNowrap}>
                    <div className={styles.dialogItemMessageInner}>
                        {from && <div className={base.circle25}>
                            {from[0]}
                        </div>}

                        <p className={styles.dialogItemMessage}>{lastMessage}</p>
                    </div>

                    <div className={styles.dialogItemMoreInner}>
                        <button className={styles.dialogItemMore}>
                            <DotsHorizontal />
                        </button>

                        <div className={styles.dialogItemActions}>
                            <Tooltip title="Закрепить">
                                <IconButton small type="light">
                                    <Pin />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="В архив">
                                <IconButton small type="light">
                                    <Archive />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Очистить историю сообщений">
                                <IconButton small type="danger">
                                    <Delete />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Выйти из беседы">
                                <IconButton small type="danger">
                                    <Enter />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogItem;