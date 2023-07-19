import React from 'react';

import styles from './index.module.css';

const typesButton = {
    "default": styles.default,
    "light": styles.light
}

const IconButton = ({type = "default", disabled = false, children, ...props}) => {
    return (
        <>
            {disabled ? <button {...props} className={`${styles.iconButton} ${typesButton[type]} ${styles.disabled}`}>
                {children}
            </button>
            : <button {...props} className={`${styles.iconButton} ${typesButton[type]}`}>
                {children}
            </button>}
        </>
    )
}

export default IconButton;