import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Build } from '../Icons';

const PageIsBuild = ({
    icon = <Build />,
    title,
    text
}) => {
    return (
        <div className={styles.messangerBuildContent}>
            {icon}

            {title && <p className={`${typography.h3} ${styles.messangerBuildTitle}`}>{title}</p>}

            {text && <p className={`${typography.text} ${styles.messangerBuildText}`}>{text}</p>}
        </div>
    )
}

export default PageIsBuild;