import React from 'react';

import styles from './index.module.css';

const statuses = {
    "error": styles.pointItemError,
    "success": styles.pointItemSuccess,
    "warn": styles.pointItemWarn
}

const TableItem = ({
    status,
    head = false,
    id,
    text,
    value
}) => {
    return (
        <div className={`${styles.pointItem}${status ? ` ${statuses[status]}` : ""}`}>
            {id && <p className={head ? styles.pointItemHeadId : styles.pointItemCellId}>{id}</p>}

            {text && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{text}</p>}

            {value && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{value}</p>}
        </div>
    )
}

export default TableItem;