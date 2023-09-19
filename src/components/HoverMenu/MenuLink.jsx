import React from 'react';

import styles from './index.module.css';

const MenuLink = ({
    text,
    icon,
    danger = false,
    disabled = false,
    className,
    children,
    ...props
}) => {
    return (
        <div className={`${styles.hoverMenuLink}${danger ? ` ${styles.delete}` : ""}${className ? ` ${className}` : ""}${disabled ? ` ${styles.disabled}` : ""}`} {...props}>
            {icon && icon}

            {text && text}

            {children}
        </div>
    )
}

export default MenuLink;