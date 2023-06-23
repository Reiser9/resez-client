import React from 'react';

import styles from './index.module.css';

const AuthFormsWrapper = ({children}) => {
    return (
        <div className={styles.content}>
            <div className={styles.contentInner}>
                {children}
            </div>
        </div>
    )
}

export default AuthFormsWrapper;