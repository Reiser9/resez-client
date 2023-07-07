import React from 'react';

import styles from './index.module.css';

import {Reload} from '../Icons';

const ReloadButton = ({loading = false, ...props}) => {
    return (
        <button className={`${styles.reload}${loading ? ` ${styles.loading}` : ""}`} {...props}>
            <Reload />
        </button>
    )
}

export default ReloadButton;