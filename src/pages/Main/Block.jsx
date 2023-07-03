import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRight } from '../../components/Icons';

const typesBlock = {
    "big": styles.big,
    "small": styles.small
}

const titleTags = {
    "h1": typography.h1,
    "h2": typography.h2,
    "h3": typography.h3
}

const Block = ({title = "", titleTag = "h3", text = "", icon, buttonText, to, type = "big", smallPadding = false}) => {
    return (
        <div className={`${styles.mainBlock} ${typesBlock[type]} ${smallPadding ? ` ${styles.p16}` : ""}`}>
            <div className={styles.mainBlockContent}>
                <h2 className={`${titleTags[titleTag]} ${styles.mainTitle}`}>{parse(title)}</h2>

                <p className={`${typography.text} ${styles.mainSubtitle}`}>{parse(text)}</p>

                {buttonText && to && <Link to={to}className={styles.mainBlockLink}>
                    {buttonText}

                    <ArrowRight />
                </Link>}
            </div>

            {icon && <div className={styles.mainBlockImgInner}>
                {icon}
            </div>}
        </div>
    )
}

export default Block;