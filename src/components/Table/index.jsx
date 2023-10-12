import React from 'react';

import styles from './index.module.css';

const Table = ({
    children
}) => {
    return (
        <div className={styles.pointTableInner}>
            <div className={styles.pointTable}>
                {children}
            </div>
        </div>
    )
}

export default Table;