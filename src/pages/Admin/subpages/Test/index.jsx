import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import { checkPermission } from '../../../../utils/checkPermission';
import { PERMISSIONS } from '../../../../consts/PERMISSIONS';

import Subjects from '../Subjects';
import Tasks from '../Tasks';


const Test = () => {
    const {user} = useSelector(state => state.user);

    return (
        <div className={styles.testInner}>
            {checkPermission(user?.permissions, [PERMISSIONS.SUBJECTS]) && <Subjects />}

            {checkPermission(user?.permissions, [PERMISSIONS.TASKS]) && <Tasks />}
        </div>
    )
}

export default Test;