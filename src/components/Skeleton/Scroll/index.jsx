import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const Scroll = () => {
    return (
        <div className={styles.scrollContent}>
            {[...Array(4)].map((_, id) => <Skeleton key={id} containerClassName={styles.scrollItem} className={skeleton.skeletonContent} />)}
        </div>
    )
}

export default Scroll;