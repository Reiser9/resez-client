import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import PrivateWrapper from '../../components/Wrapper/PrivateWrapper';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const AdminMain = React.lazy(() => import("./subpages/AdminMain"));
const Notifies = React.lazy(() => import("./subpages/Notifies"));
const Users = React.lazy(() => import("./subpages/Users"));
const Appearance = React.lazy(() => import("./subpages/Appearance"));
const CreateTheme = React.lazy(() => import("./subpages/CreateTheme"));
const Roles = React.lazy(() => import("./subpages/Roles"));
const CreateRole = React.lazy(() => import("./subpages/CreateRole"));
const Logs = React.lazy(() => import("./subpages/Logs"));
const Test = React.lazy(() => import("./subpages/Test"));
const CreateSubject = React.lazy(() => import("./subpages/CreateSubject"));
const CreateTask = React.lazy(() => import("./subpages/CreateTask"));

const Admin = () => {
    return (
        <PrivateWrapper>
            <TitleWrapper pageTitle="ResEz - Админка">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<AdminMain />)} />
                                <Route path="/notifies" element={withSuspense(<Notifies />)} />
                                <Route path="/users" element={withSuspense(<Users />)} />
                                <Route path="/appearance" element={withSuspense(<Appearance />)} />
                                <Route path="/appearance/theme/create" element={withSuspense(<CreateTheme />)} />
                                <Route path="/appearance/theme/edit/:id" element={withSuspense(<CreateTheme edit />)} />
                                <Route path="/roles" element={withSuspense(<Roles />)} />
                                <Route path="/roles/create" element={withSuspense(<CreateRole />)} />
                                <Route path="/roles/:id" element={withSuspense(<CreateRole edit />)} />
                                <Route path="/logs" element={withSuspense(<Logs />)} />
                                <Route path="/test" element={withSuspense(<Test />)} />
                                <Route path="/test/subject/create" element={withSuspense(<CreateSubject />)} />
                                <Route path="/test/subject/edit/:id" element={withSuspense(<CreateSubject edit />)} />
                                <Route path="/test/task/create" element={withSuspense(<CreateTask />)} />
                                <Route path="/test/task/edit/:id" element={withSuspense(<CreateTask edit />)} />
                                <Route path="*" element={<Navigate to={""} replace />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Главная" to="" end />
                            <SidebarLink text="Уведомления" to="notifies" />
                            <SidebarLink text="Пользователи" to="users" />
                            <SidebarLink text="Внешний вид" to="appearance" />
                            <SidebarLink text="Роли" to="roles" />
                            <SidebarLink text="Логирование" to="logs" />
                            <SidebarLink text="Тесты" to="test" />
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>
        </PrivateWrapper>
    )
}

export default Admin;