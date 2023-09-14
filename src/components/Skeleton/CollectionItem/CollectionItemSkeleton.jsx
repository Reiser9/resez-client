import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const CollectionItemSkeleton = () => {
    return (
        <Skeleton containerClassName={styles.collectionItem} className={skeleton.skeletonContent} />
    )
}

export default CollectionItemSkeleton;