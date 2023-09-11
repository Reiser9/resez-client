import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Data } from '../Icons';

const NotContent = ({text, icon, danger = false, children, ...props}) => {
    return (
        <div className={`${styles.emptyContent}${danger ? ` ${styles.danger}` : ""}`} {...props}>
            <div className={styles.emptyImgInner}>
                {icon ? icon : <Data />}
            </div>

            {text && <p className={typography.text2}>{text}</p>}

            {children}
        </div>
    )
}

export default NotContent;