import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';

const NotifiesMain = React.lazy(() => import("./subpages/NotifiesMain"));

const Profile = () => {
    return (
        <AuthWrapper>
            <TitleWrpapper pageTitle="ResEz - Уведомления">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<NotifiesMain />)} />
                                <Route path="unread" element={withSuspense(<NotifiesMain unread />)} />
                                <Route path="*" element={<Navigate to={""} />} />
                            </Routes>
                        </div>

                        <div className={pws.sidebar}>
                            <SidebarLink text="Все" to="" end />
                            <SidebarLink text="Непрочитанные" to="unread" />
                        </div>
                    </div>
                </WithSidebarWrapper>
            </TitleWrpapper>
        </AuthWrapper>
    )
}

export default Profile;