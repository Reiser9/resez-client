import React from 'react';
import { Tooltip } from 'antd';
import parse from 'html-react-parser'

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Swap } from '../Icons';

import IconButton from '../IconButton';

const TestQuestionItem = ({data}) => {
    const {number, theme, subTheme, task} = data || {};

    return (
        <div className={styles.testQuestionItem}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <div className={base.circle32}>
                        {number}
                    </div>

                    {theme && <p className={styles.testQuestionTheme}>
                        {theme}
                    </p>}

                    {subTheme && <p className={styles.testQuestionTheme}>
                        {subTheme}
                    </p>}
                </div>

                <Tooltip title="Заменить">
                    <IconButton small type="light">
                        <Swap />
                    </IconButton>
                </Tooltip>
            </div>

            <div className={`${base.format} ${styles.testQuestionTask}`}>
                {parse(task)}
            </div>
        </div>
    )
}

export default TestQuestionItem;