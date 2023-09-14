import React from 'react';

import styles from './index.module.css';

const MenuLink = ({
    text,
    icon,
    danger = false,
    className,
    children,
    ...props
}) => {
    return (
        <div className={`${styles.hoverMenuLink} ${danger ? ` ${styles.delete}` : ""}${className ? ` ${className}` : ""}`} {...props}>
            {icon && icon}

            {text && text}

            {children}
        </div>
    )
}

export default MenuLink;