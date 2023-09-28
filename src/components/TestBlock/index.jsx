import React from 'react';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Error } from '../Icons';

import Input from '../Input';
import IconButton from '../IconButton';

const TestBlock = () => {
    return (
        <div className={base.baseWrapperGap12}>
            <div className={base.titleInnerNowrap}>
                <div className={base.titleWrapper}>
                    <div className={base.circle32}>
                        1
                    </div>

                    <p className={typography.h4}>
                        Задание
                    </p>
                </div>

                <IconButton small type="danger">
                    <Error />
                </IconButton>
            </div>

            <div className={base.format}>
                <p>
                    На рисунке слева изображена схема дорог N-ского района. В таблице звёздочкой обозначено наличие дороги из одного населённого пункта в другой. Отсутствие звёздочки означает, что такой дороги нет.
                </p>

                <p>
                    Каждому населённому пункту на схеме соответствует его номер в таблице, но неизвестно, какой именно номер. Определите, какие номера населённых пунктов в таблице могут соответствовать населённым пунктам E и F на схеме. В ответе запишите эти два номера в возрастающем порядке без пробелов и знаков препинания.
                </p>
            </div>

            <div className={`${base.baseWrapperGap4} ${styles.testTaskItemAnswer}`}>
                <p className={styles.answerTitle}>Ответ:</p>

                <Input />
            </div>
        </div>
    )
}

export default TestBlock;