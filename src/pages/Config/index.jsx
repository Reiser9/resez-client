import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { PERMISSIONS } from '../../consts/PERMISSIONS';

import { withSuspense } from '../../hoc/withSuspense';

import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import PrivateWrapper from '../../components/Wrapper/PrivateWrapper';
import InnerSidebar from '../../components/InnerSidebar';
import SidebarLink from '../../components/SidebarLink';

const ConfigMain = React.lazy(() => import("./subpages/ConfigMain"));

const Config = () => {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.CONFIG]}>
            <TitleWrapper pageTitle="ResEz - Конфигурация">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.content}>
                            <Routes>
                                <Route index element={withSuspense(<ConfigMain />)} />
                                <Route path="*" element={<Navigate to={""} replace />} />
                            </Routes>
                        </div>

                        <InnerSidebar>
                            <SidebarLink text="Основные" to="" end />
                        </InnerSidebar>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>
        </PrivateWrapper>
    )
}

export default Config;