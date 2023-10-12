import React from 'react';

import styles from './index.module.css';

const TableItem = ({
    error = false,
    success = false,
    head = false,
    id,
    text,
    value
}) => {
    return (
        <div className={`${styles.pointItem}${success ? ` ${styles.pointItemSuccess}` : ""}${error ? ` ${styles.pointItemError}` : ""}`}>
            {id && <p className={head ? styles.pointItemHeadId : styles.pointItemCellId}>{id}</p>}

            {text && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{text}</p>}

            {value && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{value}</p>}
        </div>
    )
}

export default TableItem;