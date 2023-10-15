import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const ProfileMain = React.lazy(() => import("./subpages/ProfileMain"));
const Theme = React.lazy(() => import("./subpages/Theme"));
const Data = React.lazy(() => import("./subpages/Data"));
const Safe = React.lazy(() => import("./subpages/Safe"));
const Sessions = React.lazy(() => import("./subpages/Sessions"));
const Achievements = React.lazy(() => import("./subpages/Achievements"));
const Settings = React.lazy(() => import("./subpages/Settings"));

const Profile = () => {
    return (
        <AuthWrapper>
            <TitleWrapper pageTitle="ResEz - Профиль">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<ProfileMain />)} />
                                <Route path="theme" element={withSuspense(<Theme />)} />
                                <Route path="data" element={withSuspense(<Data />)} />
                                <Route path="safe" element={withSuspense(<Safe />)} />
                                <Route path="safe/sessions" element={withSuspense(<Sessions />)} />
                                <Route path="achievements" element={withSuspense(<Achievements />)} />
                                <Route path="settings" element={withSuspense(<Settings />)} />
                                <Route path="*" element={<Navigate to={""} replace />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Профиль" to="" end />
                            <SidebarLink text="Внешний вид" to="theme" />
                            <SidebarLink text="Личные данные" to="data" />
                            <SidebarLink text="Безопасность" to="safe" />
                            <SidebarLink text="Достижения" to="achievements" />
                            <SidebarLink text="Настройки" to="settings" />
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>
        </AuthWrapper>
    )
}

export default Profile;