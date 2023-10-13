import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

const TextPoint = ({
    title,
    text,
    blur = false,
    className,
    children
}) => {
    return (
        <div className={`${styles.userPoint}${blur ? ` ${styles.blur}` : ""}${className ? ` ${className}` : ""}`}>
            <p className={`${typography.text2} ${styles.userPointTitle}`}>{title}</p>

            {text && <p className={typography.text}>{blur ? "#######" : text}</p>}

            {children}
        </div>
    )
}

export default TextPoint;