import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import PrivateWrapper from '../../components/Wrapper/PrivateWrapper';
import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';

const AdminMain = React.lazy(() => import("./subpages/AdminMain"));
const Users = React.lazy(() => import("./subpages/Users"));

const Admin = () => {
    return (
        <PrivateWrapper>
            <TitleWrpapper pageTitle="ResEz - Админка">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<AdminMain />)} />
                                <Route path="/users" element={withSuspense(<Users />)} />
                                <Route path="*" element={<Navigate to={""} />} />
                            </Routes>
                        </div>

                        <div className={pws.sidebar}>
                            <SidebarLink text="Главная" to="" end />
                            <SidebarLink text="Уведомления" to="notify" />
                            <SidebarLink text="Пользователи" to="users" />
                            <SidebarLink text="Внешний вид" to="view" />
                        </div>
                    </div>
                </WithSidebarWrapper>
            </TitleWrpapper>
        </PrivateWrapper>
    )
}

export default Admin;