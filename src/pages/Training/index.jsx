import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import { withSuspense } from '../../hoc/withSuspense';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import SidebarLink from '../../components/SidebarLink';
import InnerSidebar from '../../components/InnerSidebar';

const TrainingMain = React.lazy(() => import("./subpages/TrainingMain"));
const Memo = React.lazy(() => import("./subpages/Memo"));
const AddMemoCollection = React.lazy(() => import("./subpages/AddMemoCollection"));
const MemoCollectionView = React.lazy(() => import("./subpages/MemoCollectionView"));
const MemoTypeCards = React.lazy(() => import("./subpages/MemoTypeCards"));
const Battle = React.lazy(() => import("./subpages/Battle"));

const Training = () => {
    return (
        <TitleWrapper pageTitle="ResEz - Тренинг">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>
                        <Routes>
                            <Route index element={withSuspense(<TrainingMain />)} />
                            <Route path="/memo" element={withSuspense(<Memo />)} />
                            <Route path="/memo/add" element={withSuspense(<AddMemoCollection />)} />
                            <Route path="/memo/:id/edit" element={withSuspense(<AddMemoCollection edit />)} />
                            <Route path="/memo/:id" element={withSuspense(<MemoCollectionView />)} />
                            <Route path="/memo/:id/cards" element={withSuspense(<MemoTypeCards />)} />
                            {/* <Route path="/battle" element={withSuspense(<Battle />)} /> */}
                            <Route path="*" element={<Navigate to={""} replace />} />
                        </Routes>
                    </div>

                    <InnerSidebar>
                        <SidebarLink text="Главная" to="" end />
                        <SidebarLink text="Тренировка памяти" to="memo" />
                        {/* <SidebarLink text="Битва знатоков" to="battle" disabled /> */}
                    </InnerSidebar>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Training;