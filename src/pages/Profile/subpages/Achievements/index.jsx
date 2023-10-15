import React from 'react';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import ReloadButton from '../../../../components/ReloadButton';

const Achievements = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Достижения (3)</p>

                <ReloadButton />
            </div>


        </div>
    )
}

export default Achievements;