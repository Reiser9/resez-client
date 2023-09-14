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
const Memo = React.lazy(() => import("./subpages/Memo"));
const AddMemoCollection = React.lazy(() => import("./subpages/AddMemoCollection"));
const MemoCollectionView = React.lazy(() => import("./subpages/MemoCollectionView"));
const MemoTypeCards = React.lazy(() => import("./subpages/MemoTypeCards"));

const Training = () => {
    return (
        <TitleWrpapper pageTitle="ResEz - Тренинг">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route index element={withSuspense(<TrainingMain />)} />
                            <Route path="/memo" element={withSuspense(<Memo />)} />
                            <Route path="/memo/add" element={withSuspense(<AddMemoCollection />)} />
                            <Route path="/memo/:id" element={withSuspense(<MemoCollectionView />)} />
                            <Route path="/memo/:id/cards" element={withSuspense(<MemoTypeCards />)} />
                            <Route path="*" element={<Navigate to={""} replace />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Главная" to="" end />
                        <SidebarLink text="Запоминание" to="memo" />
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrpapper>
    )
}

export default Training;