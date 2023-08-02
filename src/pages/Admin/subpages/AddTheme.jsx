import React from 'react';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import BackButton from '../../../components/BackButton';

const AddTheme = () => {
    return (
        <div className={styles.appearance}>
            <div className={styles.appearanceTitleInner}>
                <BackButton />

                <p className={typography.h3}>Создать тему</p>
            </div>


        </div>
    )
}

export default AddTheme;