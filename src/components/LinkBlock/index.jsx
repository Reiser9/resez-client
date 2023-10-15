import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRightLong } from '../Icons';

const LinkBlock = ({
    title,
    text,
    disabled = false,
    children,
    ...props
}) => {
    return (
        <Link className={`${base.item3} ${styles.trainingItem} ${disabled ? ` ${styles.disabled}` : ""}`} {...props}>
            <span className={styles.trainingItemTitleInner}>
                <p className={typography.h4}>{title}</p>

                <span className={styles.trainingItemArrow}>
                    <ArrowRightLong />
                </span>
            </span>

            {text && <p className={typography.text2}>
                {text}
            </p>}

            {children}
        </Link>
    )
}

export default LinkBlock;