import React from 'react';
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Swap } from '../Icons';

import IconButton from '../IconButton';

const TestQuestionItem = ({data}) => {
    const {id, number, theme, subTheme, task} = data || {};

    return (
        <div className={styles.testQuestionItem}>
            <div className={base.titleInnerNowrap}>
                <Link to={`/task/${id}`} className={styles.taskItemWrapper}>
                    <span className={base.circle32}>
                        {number}
                    </span>

                    <p className={typography.h4}>Задание</p>

                    {theme && <p className={styles.testQuestionTheme}>
                        {theme}
                    </p>}

                    {subTheme && <p className={styles.testQuestionTheme}>
                        {subTheme}
                    </p>}
                </Link>

                <Tooltip title="Заменить">
                    <IconButton small type="light" disabled>
                        <Swap />
                    </IconButton>
                </Tooltip>
            </div>

            {task && <div className={`${base.format} ${styles.testQuestionTask}`}>
                {parse(task)}
            </div>}
        </div>
    )
}

export default TestQuestionItem;