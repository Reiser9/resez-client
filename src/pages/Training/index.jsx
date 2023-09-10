import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';

import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const TrainingMain = React.lazy(() => import("./subpages/TrainingMain"));
const Cards = React.lazy(() => import("./subpages/Cards"));

const Training = () => {
    return (
        <TitleWrpapper pageTitle="ResEz - Тренинг">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route index element={withSuspense(<TrainingMain />)} />
                            <Route path="/cards" element={withSuspense(<Cards />)} />
                            <Route path="*" element={<Navigate to={""} />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Главная" to="" end />
                        <SidebarLink text="Карточки" to="cards" />
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrpapper>
    )
}

export default Training;