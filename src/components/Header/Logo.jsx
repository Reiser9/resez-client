import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

import { getEvent } from '../../utils/getEvent';

const events = {
    newyear: {
        icon: "/assets/img/newyear.svg",
        decor: "/assets/img/newyear-decor.svg",
        style: styles.newyear
    },
    halloween: {
        icon: "/assets/img/halloween.svg",
        decor: "/assets/img/halloween-decor.svg",
        style: styles.halloween
    },
    not: {
        icon: "",
        decor: "",
        style: ""
    }
}

const Logo = () => {
    return (
        <Link to="/" className={`${styles.headerLogoInner} ${events[getEvent()].style ? events[getEvent()].style : ""}`}>
            <span className={styles.headerLogo}>
                ResEz

                {events[getEvent()].decor && <img src={events[getEvent()].decor} alt="event" className={styles.headerLogoDecor} />}
            </span>

            {events[getEvent()].icon && <img src={events[getEvent()].icon} alt="event" className={styles.headerLogoImg} />}

            <span className={styles.headerLogoVersion}>beta</span>
        </Link>
    )
}

export default Logo;