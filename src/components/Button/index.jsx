import React from 'react';

import styles from './index.module.css';

import Preloader from '../Preloader';

const typesButton = {
    "fill": styles.fill,
    "outline": styles.outline,
    "empty": styles.empty
}

const Button = ({text, auto = false, loading = false, type = "fill", className, children, ...props}) => {
    return (
        <div className={`${styles.buttonInner}${className ? ` ${className}` : ""}${auto ? ` ${styles.auto}` : ""}`}>
            {loading
            ? <button className={`${styles.button} ${styles.disabled} ${typesButton[type]}`}></button>
            : <button className={`${styles.button} ${typesButton[type]}`} {...props}>
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