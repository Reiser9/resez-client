import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const NotifiesMain = React.lazy(() => import("./subpages/NotifiesMain"));

const Notifies = () => {
    return (
        <AuthWrapper>
            <TitleWrapper pageTitle="ResEz - Уведомления">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<NotifiesMain />)} />
                                <Route path="unread" element={withSuspense(<NotifiesMain unread />)} />
                                <Route path="*" element={<Navigate to={""} replace />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Все" to="" end />
                            <SidebarLink text="Непрочитанные" to="unread" />
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>
        </AuthWrapper>
    )
}

export default Notifies;