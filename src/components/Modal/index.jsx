import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross } from '../Icons';

const modalSize = (type) => {
    switch(type) {
        case "default":
            return styles.default
        case "small":
            return styles.small
        default:
            return styles.default
    }
}

const Modal = ({value, setValue, title, subtitle, text, size = "default", children}) => {
    return (
        <div className={`${styles.modalOverlay}${value ? ` ${styles.active}` : ""}`} onClick={() => setValue(false)}>
            <div className={`${styles.modalWrapper} ${modalSize(size)}`}>
                <div className={`${styles.modalContent}${value ? ` ${styles.active}` : ""}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.modalTitleInner}>
                        <div className={styles.modalTitleWrapper}>
                            {title && <p className={typography.h3}>{title}</p>}

                            {subtitle && <p className={`${typography.text2} ${styles.modalDate}`}>{subtitle}</p>}
                        </div>

                        <button className={styles.modalCrossButton} onClick={() => setValue(false)}>
                            <Cross />
                        </button>
                    </div>

                    {text && <div className={styles.modalText}>
                        <p className={typography.text}>
                            {text}
                        </p>
                    </div>}

                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;