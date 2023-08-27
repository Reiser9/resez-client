import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const ProfileMain = React.lazy(() => import("./subpages/ProfileMain"));
const Theme = React.lazy(() => import("./subpages/Theme"));
const Data = React.lazy(() => import("./subpages/Data"));
const Safe = React.lazy(() => import("./subpages/Safe"));
const Achievments = React.lazy(() => import("./subpages/Achievments"));

const Profile = () => {
    return (
        <AuthWrapper>
            <TitleWrpapper pageTitle="ResEz - Профиль">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<ProfileMain />)} />
                                <Route path="/theme/*" element={withSuspense(<Theme />)} />
                                <Route path="/data" element={withSuspense(<Data />)} />
                                <Route path="/safe/*" element={withSuspense(<Safe />)} />
                                <Route path="/achievments/*" element={withSuspense(<Achievments />)} />
                                <Route path="*" element={<Navigate to={""} />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Профиль" to="" end />
                            <SidebarLink text="Внешний вид" to="theme" />
                            <SidebarLink text="Личные данные" to="data" />
                            <SidebarLink text="Безопасность" to="safe" />
                            <SidebarLink text="Достижения" to="achievments" />
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrpapper>
        </AuthWrapper>
    )
}

export default Profile;