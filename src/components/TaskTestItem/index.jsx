import React from 'react';
import parse from 'html-react-parser';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Error } from '../Icons';

import useWarn from '../../hooks/useWarn';

import IconButton from '../IconButton';
import Button from '../Button';
import Spoiler from '../Spoiler';
import Input from '../Input';
import Modal from '../Modal';

const TaskTestItem = ({
    data,
    value,
    setValue = () => {},
    showAnswer = false,
    test = false
}) => {
    const {id, number, task, solution, answer, isDetailedAnswer} = data || {};

    const [warn, setWarn] = React.useState(false);
    const [warnText, setWarnText] = React.useState("");

    const {warnTask} = useWarn();

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <div className={base.circle32}>
                            {number}
                        </div>

                        <p className={typography.h4}>Задание</p>
                    </div>

                    <IconButton small type="danger" onClick={() => setWarn(true)}>
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

                    {answer && <p className={styles.taskItemAnswer}>Ответ: {answer}</p>}
                </Spoiler>}
            </div>

            <Modal value={warn} setValue={setWarn} title="Жалоба на задание" size="small">
                <Input value={warnText} setValue={setWarnText} type="textarea" title="Опишите проблему" trackLength lengthLimit={1000} />

                <Button onClick={() => warnTask(id, warnText, () => setWarn(false))}>
                    Отправить
                </Button>
            </Modal>
        </>
    )
}

export default TaskTestItem;