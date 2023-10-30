import React from 'react';
import Skeleton from 'react-loading-skeleton';

import base from '../../../styles/base.module.css';
import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const CatalogItem = () => {
    return (
        <Skeleton containerClassName={`${base.item2} ${styles.catalogItem}`} className={skeleton.skeletonContent} />
    )
}

export default CatalogItem;