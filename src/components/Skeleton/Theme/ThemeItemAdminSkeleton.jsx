import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from '../../ThemeItem/index.module.css';

const ThemeItemAdminSkeleton = () => {
    return (
        <Skeleton containerClassName={styles.appearanceItemSkeleton} className={skeleton.skeletonContent} />
    )
}

export default ThemeItemAdminSkeleton;