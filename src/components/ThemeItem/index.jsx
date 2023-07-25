import React from 'react';

import styles from './index.module.css';

const ThemeItem = ({data, active = false, disabled = false, ...props}) => {
    const {primary} = data;

    return (
        <button
            className={`${styles.colorItem}${active ? ` ${styles.active}` : ""}${disabled ? ` ${styles.disabled}` : ""}`}
            {...props}
        >
            <span className={styles.colorItemCircle} style={{background: primary}}></span>
        </button>
    )
}

export default ThemeItem;