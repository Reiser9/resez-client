import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';

import BackButton from '../BackButton';

const CreatePageDefault = ({
    title,
    children
}) => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleWrapper}>
                <BackButton />

                <p className={typography.h3}>{title}</p>
            </div>

            {children}
        </div>
    )
}

export default CreatePageDefault;