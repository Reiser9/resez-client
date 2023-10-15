import React from 'react';
import parse from 'html-react-parser';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Error } from '../Icons';

import IconButton from '../IconButton';
import Spoiler from '../Spoiler';

const TaskTestItem = ({data, showAnswer = false}) => {
    const {number, task, solution, answer} = data || {};

    return (
        <div className={styles.taskItem}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <div className={base.circle32}>
                        {number}
                    </div>

                    <p className={typography.h4}>Задание</p>
                </div>

                <IconButton small type="danger">
                    <Error />
                </IconButton>
            </div>

            <div className={base.format}>
                {parse(task)}
            </div>

            <Spoiler title="Решение" defaultOpen={showAnswer}>
                <div className={base.format}>
                    {parse(solution)}
                </div>

                <p className={styles.taskItemAnswer}>Ответ: {answer}</p>
            </Spoiler>
        </div>
    )
}

export default TaskTestItem;