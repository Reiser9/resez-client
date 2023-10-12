import React from 'react';

import styles from './index.module.css';
import { ArrowBottom } from '../Icons';

const Spoiler = ({
    title,
    defaultOpen = true,
    children
}) => {
    const [isShow, setIsShow] = React.useState(defaultOpen);

    return (
        <div className={styles.spoilerWrapper}>
            <button className={`${styles.spoilerButton}${isShow ? ` ${styles.spoilerShow}` : ""}`} onClick={() => setIsShow(prev => !prev)}>
                {title}

                <ArrowBottom />
            </button>

            {isShow && children}
        </div>
    )
}

export default Spoiler;