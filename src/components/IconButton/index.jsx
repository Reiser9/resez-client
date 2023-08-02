import React from 'react';

import styles from './index.module.css';

const typesButton = {
    "default": styles.default,
    "light": styles.light,
    "danger": styles.danger
}

const IconButton = ({
    type = "default",
    disabled = false,
    full = false,
    className,
    children,
    ...props
}) => {
    return (
        <>
            {disabled ? <button className={`${styles.iconButton}${className ? ` ${className}` : ""} ${typesButton[type]} ${styles.disabled}${full ? ` ${styles.full}` : ""}`} {...props}>
                {children}
            </button>
            : <button className={`${styles.iconButton}${className ? ` ${className}` : ""} ${typesButton[type]}${full ? ` ${styles.full}` : ""}`} {...props}>
                {children}
            </button>}
        </>
    )
}

export default IconButton;