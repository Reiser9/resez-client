import React from 'react';

import styles from './index.module.css';

import Preloader from '../Preloader';

const LoaderForItem = () => {
    return (
        <div className={styles.loaderItem}>
            <Preloader small />
        </div>
    )
}

export default LoaderForItem;