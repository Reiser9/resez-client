import React from 'react';

import styles from './index.module.css';
import { ArrowBottom } from '../Icons';

const themes = {
    default: "",
    white: styles.white
}

const Spoiler = ({
    title,
    defaultOpen = true,
    theme = "default",
    children
}) => {
    const [isShow, setIsShow] = React.useState(defaultOpen);

    return (
        <div className={styles.spoilerWrapper}>
            <button className={`${styles.spoilerButton}${themes[theme] ? ` ${themes[theme]}` : ""}${isShow ? ` ${styles.spoilerShow}` : ""}`} onClick={() => setIsShow(prev => !prev)}>
                {title}

                <ArrowBottom />
            </button>

            {isShow && children}
        </div>
    )
}

export default Spoiler;