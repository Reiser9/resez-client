import React from 'react';

import styles from './index.module.css';

import Subjects from '../Subjects';
import Tasks from '../Tasks';

const Test = () => {
    return (
        <div className={styles.testInner}>
            <Subjects />

            <Tasks />
        </div>
    )
}

export default Test;