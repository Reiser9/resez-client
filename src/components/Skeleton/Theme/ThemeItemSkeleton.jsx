import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from '../../ThemeItem/index.module.css';

const ThemeItemSkeleton = () => {
    return (
        <Skeleton containerClassName={styles.colorItem} className={skeleton.skeletonContent} />
    )
}

export default ThemeItemSkeleton;