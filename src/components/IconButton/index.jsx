import React from 'react';
import { Link } from 'react-router-dom';

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
    to = "",
    className,
    children,
    ...props
}) => {
    return (
        <>
            {disabled ? <button className={`${styles.iconButton}${className ? ` ${className}` : ""} ${typesButton[type]} ${styles.disabled}${full ? ` ${styles.full}` : ""}`} {...props}>
                {children}
            </button>
            : to
            ? <Link to={to} className={`${styles.iconButton}${className ? ` ${className}` : ""} ${typesButton[type]}${full ? ` ${styles.full}` : ""}`} {...props}>
                {children}
            </Link>
            : <button className={`${styles.iconButton}${className ? ` ${className}` : ""} ${typesButton[type]}${full ? ` ${styles.full}` : ""}`} {...props}>
                {children}
            </button>}
        </>
    )
}

export default IconButton;