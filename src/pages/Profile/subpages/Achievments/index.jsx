import React from 'react';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import ReloadButton from '../../../../components/ReloadButton';

const Achievments = () => {
    return (
        <div className={styles.achivments}>
            <div className={styles.achivmentsTitleInner}>
                <p className={typography.h3}>Достижения (3)</p>

                <ReloadButton />
            </div>


        </div>
    )
}

export default Achievments;