import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { ArrowRightLong } from '../Icons';

const CardLink = ({
    title,
    to = "",
    disabled = false,
    children
}) => {
    return (
        <Link to={to} className={`${base.item4} ${styles.cardLink}${disabled ? ` ${styles.disabled}` : ""}`}>
            <span className={styles.cardLinkWrapper}>
                <p className={styles.cardLinkName}>{title}</p>

                <ArrowRightLong />
            </span>

            <span className={styles.cardLinkImgInner}>
                {children}
            </span>
        </Link>
    )
}

export default CardLink;