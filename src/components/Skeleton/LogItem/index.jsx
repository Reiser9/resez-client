import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const LogItem = () => {
    return (
        <Skeleton containerClassName={styles.logItem} className={skeleton.skeletonContent} />
    )
}

export default LogItem;