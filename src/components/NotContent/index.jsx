import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Data } from '../Icons';

const NotContent = ({text, icon, ...props}) => {
    return (
        <div className={styles.emptyContent} {...props}>
            <div className={styles.emptyImgInner}>
                {icon ? icon : <Data />}
            </div>

            <p className={typography.text2}>{text}</p>
        </div>
    )
}

export default NotContent;