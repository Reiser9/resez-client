import React from 'react';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';

const Subjects = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Задания (7)</p>

                    <ReloadButton />
                </div>

                <Button type="light" auto to="task/create">
                    Создать
                </Button>
            </div>
        
        </div>
    )
}

export default Subjects;