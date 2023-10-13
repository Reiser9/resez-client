import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';

const TestsMain = React.lazy(() => import("./subpages/TestsMain"));
const MyTests = React.lazy(() => import("./subpages/MyTests"));
const CreateTest = React.lazy(() => import("./subpages/CreateTest"));
const TestView = React.lazy(() => import("./subpages/TestView"));

const Tests = () => {
    return (
        <TitleWrapper pageTitle="ResEz - Тесты">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route index element={withSuspense(<TestsMain />)} />
                            <Route path="/subject/:subject" element={withSuspense(<TestsMain />)} />
                            <Route path="/my" element={withSuspense(<MyTests />)} />
                            <Route path="/create" element={withSuspense(<CreateTest />)} />
                            <Route path="/:id" element={withSuspense(<TestView />)} />
                            <Route path="*" element={<Navigate to={""} replace />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Главная" to="" end />
                        <SidebarLink text="Мои тесты" to="my" />
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Tests;