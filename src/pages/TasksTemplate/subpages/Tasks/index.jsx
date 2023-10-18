import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { Info } from '../../../../components/Icons';

import useTask from '../../../../hooks/useTask';

import TextPoint from '../../../../components/TextPoint';
import TaskTestItem from '../../../../components/TaskTestItem';
import Preloader from '../../../../components/Preloader';
import InnerSidebar from '../../../../components/InnerSidebar';

const Tasks = () => {
    const {getTasksBySubthemeId, getTaskById} = useTask();
    const {subthemeId, taskId} = useParams();
    const {taskIsLoading, tasks} = useSelector(state => state.task);

    const {subject, number, theme, subTheme} = tasks || {};

    const navigate = useNavigate();

    React.useEffect(() => {
        if(subthemeId){
            getTasksBySubthemeId(subthemeId, () => navigate("/"));
        }
    }, [subthemeId]);

    React.useEffect(() => {
        if(taskId){
            getTaskById(taskId, () => navigate("/"));
        }
    }, [taskId]);

    if(taskIsLoading){
        return <Preloader />
    }

    return (
        <div className={styles.taskInner}>
            <div className={base.taskContent}>
                {tasks?.tasks?.map((data, id) => <TaskTestItem key={id} data={data} showAnswer={taskId} />)}
            </div>

            <InnerSidebar icon={<Info />} className={styles.taskSidebar} big>
                <TextPoint title="Предмет:">
                    <p className={typography.h4}>{subject}</p>
                </TextPoint>

                <TextPoint title="Номер задания:">
                    <p className={typography.h4}>{number}</p>
                </TextPoint>

                <TextPoint title="Тема:">
                    <p className={typography.h4}>{theme}</p>
                </TextPoint>

                <TextPoint title="Подтема:">
                    <p className={typography.h4}>{subTheme}</p>
                </TextPoint>
            </InnerSidebar>
        </div>
    )
}

export default Tasks;