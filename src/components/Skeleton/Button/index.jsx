import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const Button = () => {
    return (
        <Skeleton containerClassName={styles.button} className={skeleton.skeletonContent} />
    )
}

export default Button;