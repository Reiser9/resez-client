import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.css';

const SidebarLink = ({text, to, icon, children, ...props}) => {
    return (
        <NavLink to={to} className={({isActive}) => `${styles.sidebarLink} ${isActive ? ` ${styles.active}` : ""}`} {...props}>
            {icon && icon}
            
            {children}
            {text}
        </NavLink>
    )
}

export default SidebarLink;