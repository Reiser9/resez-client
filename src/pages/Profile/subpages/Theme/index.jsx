import React from 'react';

import typography from '../../../../styles/typography.module.css';
import profile from '../../index.module.css';
import styles from './index.module.css';

import ChangeTheme from './ChangeTheme';
import ChangeMode from './ChangeMode';

const Theme = () => {
    return (
        <>
            <div className={profile.contentBlock}>
                <div className={profile.contentBlockTitleInner}>
                    <p className={typography.h3}>
                        Основной цвет
                    </p>
                </div>

                <ChangeTheme />
            </div>
            
            <div className={profile.contentBlock}>
                <p className={typography.h3}>
                    Тема
                </p>

                <ChangeMode />
            </div>
        </>
    )
}

export default Theme;