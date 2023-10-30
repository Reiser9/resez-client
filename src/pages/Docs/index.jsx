import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import InnerSidebar from '../../components/InnerSidebar';
import SidebarLink from '../../components/SidebarLink';

const Rules = React.lazy(() => import("./subpages/Rules"));
const PublicOffer = React.lazy(() => import("./subpages/PublicOffer"));

const Docs = () => {
    return (
        <TitleWrapper pageTitle="ResEz - Полезное">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route path="rules" element={withSuspense(<Rules />)} />
                            <Route path="publicoffer" element={withSuspense(<PublicOffer />)} />
                            <Route path="*" element={<Navigate to={"rules"} replace />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Правила проекта" to="rules" end />
                        <SidebarLink text="Публичная оферта" to="publicoffer" />
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Docs;