import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const SessionItemCompact = () => {
    return (
        <Skeleton containerClassName={styles.sessionItem} className={skeleton.skeletonContent} />
    )
}

export default SessionItemCompact;