import React from 'react';
import parse from 'html-react-parser';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Error } from '../Icons';

import IconButton from '../IconButton';
import Spoiler from '../Spoiler';
import Input from '../Input';

const TaskTestItem = ({
    data,
    value,
    setValue = () => {},
    showAnswer = false,
    test = false
}) => {
    const {id, number, task, solution, answer, isDetailedAnswer} = data || {};

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

            {task && <div className={base.format}>
                {parse(task)}
            </div>}

            {test
            ? isDetailedAnswer
                ? <p className={styles.taskItemDetailed}>
                    Задание проверяется самостоятельно, решите данное задание в тетради и на следующей странице вы сможете проверить его
                </p>
                : <div className={`${base.baseWrapperGap4} ${styles.testTaskItemAnswer}`}>
                    <p className={styles.answerTitle}>Ответ:</p>

                    <Input value={value} setValue={e => setValue(id, e)} />
                </div>
            : <Spoiler title="Решение" defaultOpen={showAnswer}>
                {solution && <div className={base.format}>
                    {parse(solution)}
                </div>}

                <p className={styles.taskItemAnswer}>Ответ: {answer}</p>
            </Spoiler>}
        </div>
    )
}

export default TaskTestItem;