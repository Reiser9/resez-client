import React from 'react';
import Skeleton from 'react-loading-skeleton';

import base from '../../../styles/base.module.css';
import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const WarnItemSkeleton = () => {
    return (
        <Skeleton containerClassName={`${base.item3} ${styles.warnItemSkeleton}`} className={skeleton.skeletonContent} />
    )
}

export default WarnItemSkeleton;