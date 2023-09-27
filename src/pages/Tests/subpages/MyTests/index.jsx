import React from 'react';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import TestItem from '../../../../components/TestItem';
import Button from '../../../../components/Button';

const MyTests = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Мои тесты</p>

                <Button auto type="light" to="../create">
                    Создать
                </Button>
            </div>

            <div className={base.contentItems}>
                <TestItem data={{subject: "Информатика"}} />
            </div>
        </div>
    )
}

export default MyTests;