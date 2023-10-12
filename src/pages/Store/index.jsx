import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import InnerSidebar from '../../components/InnerSidebar';
import SidebarLink from '../../components/SidebarLink';

const StoreMain = React.lazy(() => import("./subpages/StoreMain"));

const Info = () => {
    return (
        <TitleWrapper pageTitle="ResEz - Полезное">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route index element={withSuspense(<StoreMain />)} />
                            <Route path="*" element={<Navigate to={""} replace />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Главная" to="" end />
                        <SidebarLink text="Темы" to="themes" />
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Info;