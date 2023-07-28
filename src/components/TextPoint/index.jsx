import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

const TextPoint = ({title, text, children}) => {
    return (
        <div className={styles.userPoint}>
            <p className={`${typography.text2} ${styles.userPointTitle}`}>{title}</p>

            {text && <p className={typography.text}>{text}</p>}

            {children}
        </div>
    )
}

export default TextPoint;