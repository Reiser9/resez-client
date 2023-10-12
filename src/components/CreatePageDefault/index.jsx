import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';

import BackButton from '../BackButton';

const CreatePageDefault = ({
    title,
    button,
    children
}) => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <BackButton />

                    <p className={typography.h3}>{title}</p>
                </div>

                {button && button}
            </div>

            {children}
        </div>
    )
}

export default CreatePageDefault;