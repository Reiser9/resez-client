import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';
import { checkPermission } from '../../utils/checkPermission';
import {PERMISSIONS} from '../../consts/PERMISSIONS';

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
const Warn = React.lazy(() => import("./subpages/Warn"));

const Admin = () => {
    const {user} = useSelector(state => state.user);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ADMIN]}>
            <TitleWrapper pageTitle="ResEz - Админка">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<AdminMain />)} />
                                {checkPermission(user?.permissions, [PERMISSIONS.NOTIFIES]) && <Route path="/notifies" element={withSuspense(<Notifies />)} />}
                                <Route path="/users" element={withSuspense(<Users />)} />
                                {checkPermission(user?.permissions, [PERMISSIONS.THEMES]) && <Route path="/appearance" element={withSuspense(<Appearance />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.THEMES]) && <Route path="/appearance/theme/create" element={withSuspense(<CreateTheme />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.THEMES]) && <Route path="/appearance/theme/edit/:id" element={withSuspense(<CreateTheme edit />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.ROLES]) && <Route path="/roles" element={withSuspense(<Roles />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.CREATE_ROLES]) && <Route path="/roles/create" element={withSuspense(<CreateRole />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.UPDATE_ROLES]) && <Route path="/roles/:id" element={withSuspense(<CreateRole edit />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.LOGS]) && <Route path="/logs" element={withSuspense(<Logs />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.TESTS]) && <Route path="/test" element={withSuspense(<Test />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.CREATE_SUBJECTS]) && <Route path="/test/subject/create" element={withSuspense(<CreateSubject />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.UPDATE_SUBJECTS]) && <Route path="/test/subject/edit/:id" element={withSuspense(<CreateSubject edit />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.CREATE_TASKS]) && <Route path="/test/task/create" element={withSuspense(<CreateTask />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.UPDATE_TASKS]) && <Route path="/test/task/edit/:id" element={withSuspense(<CreateTask edit />)} />}
                                {checkPermission(user?.permissions, [PERMISSIONS.COMPLAINTS]) && <Route path="/warn" element={withSuspense(<Warn edit />)} />}
                                <Route path="*" element={<Navigate to={""} replace />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Главная" to="" end />
                            {checkPermission(user?.permissions, [PERMISSIONS.NOTIFIES]) && <SidebarLink text="Уведомления" to="notifies" />}
                            <SidebarLink text="Пользователи" to="users" />
                            {checkPermission(user?.permissions, [PERMISSIONS.THEMES]) && <SidebarLink text="Внешний вид" to="appearance" />}
                            {checkPermission(user?.permissions, [PERMISSIONS.ROLES]) && <SidebarLink text="Роли" to="roles" />}
                            {checkPermission(user?.permissions, [PERMISSIONS.LOGS]) && <SidebarLink text="Логирование" to="logs" />}
                            {checkPermission(user?.permissions, [PERMISSIONS.TESTS]) && <SidebarLink text="Тесты" to="test" />}
                            {checkPermission(user?.permissions, [PERMISSIONS.COMPLAINTS]) && <SidebarLink text="Жалобы" to="warn" />}
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>
        </PrivateWrapper>
    )
}

export default Admin;