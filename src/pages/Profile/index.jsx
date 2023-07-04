import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './index.module.css';

import {withSuspense} from '../../hoc/withSuspense';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';

const ProfileMain = React.lazy(() => import("./subpages/ProfileMain"));
const Safe = React.lazy(() => import("./subpages/Safe"));

const Profile = () => {
    return (
        <AuthWrapper>
            <TitleWrpapper pageTitle="ResEz - Профиль">
                <WithSidebarWrapper>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <Routes>
                                <Route index element={withSuspense(ProfileMain)} />
                                <Route path="/safe/*" element={withSuspense(Safe)} />
                            </Routes>
                        </div>

                        <div className={styles.sidebar}>
                            <SidebarLink text="Профиль" to="" end />
                            <SidebarLink text="Внешний вид" to="theme" />
                            <SidebarLink text="Личные данные" to="data" />
                            <SidebarLink text="Безопасность" to="safe" />
                        </div>
                    </div>
                </WithSidebarWrapper>
            </TitleWrpapper>
        </AuthWrapper>
    )
}

export default Profile;