import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const Notify = () => {
    return (
        <Skeleton containerClassName={styles.notify} className={skeleton.skeletonContent} />
    )
}

export default Notify;