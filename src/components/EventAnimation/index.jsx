import React from 'react';
import Snowfall from 'react-snowfall';

import styles from './index.module.css';

const snowflake2 = document.createElement('img')
snowflake2.src = "/assets/img/snowflake.png";

const EventAnimation = () => {
    return (
        <div className={styles.snow}>
            <Snowfall
                snowflakeCount={20}
                images={[snowflake2]}
                radius={[2, 12]}
            />
        </div>
    )
}

export default EventAnimation;