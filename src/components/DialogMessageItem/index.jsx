import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

const DialogMessageItem = ({
    name,
    time,
    text
}) => {
    return (
        <div className={styles.messangerDialogItem}>
            <div className={base.circle40}>
                {name && name[0]}
            </div>

            <div className={base.baseWrapperGap0}>
                <div className={base.titleInner}>
                    <p className={styles.messangerDialogItemName}>{name}</p>

                    <p className={styles.messangerDialogItemTime}>{time}</p>
                </div>

                <p className={typography.text}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default DialogMessageItem;