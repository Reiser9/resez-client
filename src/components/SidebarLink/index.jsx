import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.css';

const SidebarLink = ({text, to, icon, disabled = false, children, ...props}) => {
    return (
        <NavLink to={to} className={({isActive}) => `${styles.sidebarLink}${disabled ? ` ${styles.disabled}` : ""}${isActive ? ` ${styles.active}` : ""}`} {...props}>
            {icon && icon}
            
            {children}
            {text}
        </NavLink>
    )
}

export default SidebarLink;