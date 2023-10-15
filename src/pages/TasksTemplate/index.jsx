import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';

const Tasks = React.lazy(() => import("./subpages/Tasks"));

const TasksTemplate = () => {
    return (
        <TitleWrapper pageTitle="ResEz - Задания">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <Routes>
                            <Route path="/:taskId" element={withSuspense(<Tasks />)} />
                            <Route path="/subtheme/:subthemeId" element={withSuspense(<Tasks />)} />
                            <Route path="*" element={<Navigate to={"/"} replace />} />
                        </Routes>
                    </div>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default TasksTemplate;