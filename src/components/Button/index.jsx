import React from 'react';

import styles from './index.module.css';

import Preloader from '../Preloader';

const Button = ({text, auto = false, loading = false, className, children, ...props}) => {
    return (
        <div className={`${styles.buttonInner}${className ? ` ${className}` : ""}${auto ? ` ${styles.auto}` : ""}`}>
            {loading
            ? <button className={`${styles.button} ${styles.disabled}`}></button>
            : <button className={`${styles.button}`} {...props}>
                {text}
                {children}
            </button>}

            {loading && <span className={styles.buttonPreloader}>
                <Preloader small />
            </span>}
        </div>
    )
}

export default Button;