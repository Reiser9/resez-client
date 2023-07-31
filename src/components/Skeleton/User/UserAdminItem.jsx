import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const UserAdminItem = () => {
    return (
        <Skeleton containerClassName={styles.userAdminItem} className={skeleton.skeletonContent} />
    )
}

export default UserAdminItem;