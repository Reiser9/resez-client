import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import Audio from '../Audio';

const DialogMessageItem = ({
    name,
    time,
    text,
    audio,
    isSelected = false,
    ...props
}) => {
    return (
        <div className={`${styles.messangerDialogItem} ${isSelected ? ` ${styles.selected}` : ""}`} {...props}>
            <div className={base.circle40}>
                {name && name[0]}
            </div>

            <div className={base.baseWrapperGap0}>
                <div className={base.titleInner}>
                    <p className={styles.messangerDialogItemName}>{name}</p>

                    <p className={styles.messangerDialogItemTime}>{time}</p>
                </div>

                {text && <p className={typography.text}>
                    {text}
                </p>}

                {audio && <Audio audio={audio} />}
            </div>
        </div>
    )
}

export default DialogMessageItem;