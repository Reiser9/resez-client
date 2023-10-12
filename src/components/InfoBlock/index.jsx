import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

const InfoBlock = ({
    icon,
    title,
    text,
    button,
    image,
    className,
    ...props
}) => {
    return (
        <div className={`${styles.testWelcomeWrapper}${className ? ` ${className}` : ""}`} {...props}>
            <div className={styles.testWelcome}>
                {icon && <div className={styles.testWelcomeIconInner}>
                    {icon}
                </div>}

                <div className={styles.testWelcomeTextInner}>
                    {title && <p className={typography.h4}>{title}</p>}

                    {text && <p className={typography.text2}>
                        {text}
                    </p>}
                    
                    {button && button}
                </div>

                {image && <div className={styles.testWelcomeIcon}>{image}</div>}
            </div>
        </div>
    )
}

export default InfoBlock;