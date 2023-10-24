import React from 'react';
import Snowfall from 'react-snowfall';

import styles from './index.module.css';

import { getEvent } from '../../utils/getEvent';

const snowflake = document.createElement('img');
snowflake.src = "/assets/img/snowflake.png";

const EventAnimation = () => {
    return (
        <>
            {getEvent() === "newyear" && <div className={styles.snow}>
                <Snowfall
                    snowflakeCount={40}
                    images={[snowflake]}
                    radius={[2, 12]}
                />
            </div>}
        </>
    )
}

export default EventAnimation;