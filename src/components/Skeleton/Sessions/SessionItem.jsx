import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const SessionItem = () => {
    return (
        <Skeleton containerClassName={styles.sessionItem} className={skeleton.skeletonContent} />
    )
}

export default SessionItem;