import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import styles from './index.module.css';

const TaskItem = () => {
    return (
        <Skeleton containerClassName={styles.taskItem} className={skeleton.skeletonContent} />
    )
}

export default TaskItem;