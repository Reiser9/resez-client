import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import { Cross } from '../../../../components/Icons';
import { PERMISSIONS } from '../../../../consts/PERMISSIONS';
import { checkPermission } from '../../../../utils/checkPermission';

import useTest from '../../../../hooks/useTest';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import TaskItem from '../../../../components/TaskItem';
import TaskItemSkeleton from '../../../../components/Skeleton/TaskItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';

import NotContent from '../../../../components/NotContent';

const Subjects = () => {
    const [tasksMoreLoading, setTasksMoreLoading] = React.useState(false);

    const {error, taskIsLoading, loadTasks, getAllTasks, removeTask} = useTest();
    const {tasksIsLoading, tasks} = useSelector(state => state.admin);
    const {user} = useSelector(state => state.user);

    const loadMoreTasks = async () => {
        setTasksMoreLoading(true);
        await getAllTasks(tasks?.tasks?.length, 5);
        setTasksMoreLoading(false);
    }
    
    React.useEffect(() => {
        loadTasks();
    }, []);

    React.useEffect(() => {
        if(tasks?.tasks?.length === 0 && !tasks?.isLast){
            loadMoreTasks();
        }
    }, [tasks?.tasks, tasks?.isLast]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Задания {!tasksIsLoading && `(${tasks.totalCount || 0})`}</p>

                    <ReloadButton loading={tasksIsLoading} onClick={() => loadTasks(0, 5, true)} />
                </div>

                {checkPermission(user?.permissions, [PERMISSIONS.CREATE_TASKS]) && <Button type="light" auto to="task/create" disabled={tasksIsLoading}>
                    Создать
                </Button>}
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={tasksIsLoading}
                dataMoreIsLoading={tasksMoreLoading}
                dataLength={tasks?.tasks?.length}
                Skeleton={TaskItemSkeleton}
                skeletonLoading={2}
                skeletonMoreLoading={1}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке заданий" icon={<Cross />} danger />}
                notContent={<NotContent text="Заданий не найдено" />}
                isLast={tasks?.isLast}
                loadMoreData={loadMoreTasks}
            >
                {tasks?.tasks?.map((data, id) => 
                    <TaskItem
                        key={id}
                        data={data}
                        deleteTask={() => removeTask(data.id)}
                        loading={taskIsLoading.includes(data.id)}
                        edit={checkPermission(user?.permissions, [PERMISSIONS.UPDATE_TASKS])}
                        remove={checkPermission(user?.permissions, [PERMISSIONS.DELETE_TASKS])}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Subjects;