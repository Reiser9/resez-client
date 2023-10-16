import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { useSelector } from "react-redux";
import ruRU from 'antd/locale/ru_RU';

import "./App.css";

import { CONFIG } from "./consts/CONFIG";

import { withSuspense } from "./hoc/withSuspense";

import DefaultWrapper from "./components/Wrapper/DefaultWrapper";
import EmptyWrapper from "./components/Wrapper/EmptyWrapper";

const Main = React.lazy(() => import("./pages/Main"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Notifies = React.lazy(() => import("./pages/Notifies"));
const Training = React.lazy(() => import("./pages/Training"));
const Tests = React.lazy(() => import("./pages/Tests"));
const Test = React.lazy(() => import("./pages/Test"));
const Messanger = React.lazy(() => import("./pages/Messanger"));
const Info = React.lazy(() => import("./pages/Info"));
const Store = React.lazy(() => import("./pages/Store"));
const Admin = React.lazy(() => import("./pages/Admin"));
const TasksTemplate = React.lazy(() => import("./pages/TasksTemplate"));

const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Recovery = React.lazy(() => import("./pages/Recovery"));
const ConfirmCode = React.lazy(() => import("./pages/ConfirmCode"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
    const {user} = useSelector(state => state.user);
    const {isAuth} = useSelector(state => state.auth);

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: user.isPreviewTheme ? user?.previewTheme?.primary || CONFIG.BASE_COLOR : user?.theme?.primary || CONFIG.BASE_COLOR,
                    fontFamily: "Nunito"
                }
            }}
        >
            <Routes>
                {isAuth && !user.isVerified
                ? <Route path="/">
                    <Route index element={withSuspense(<ConfirmCode />)} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Route>
                : <>
                    <Route path="/" element={<DefaultWrapper />}>
                        <Route index element={withSuspense(<Main />)} />
                        <Route path="profile/*" element={withSuspense(<Profile />)} />
                        <Route path="notifies/*" element={withSuspense(<Notifies />)} />
                        <Route path="training/*" element={withSuspense(<Training />)} />
                        <Route path="tests/*" element={withSuspense(<Tests />)} />
                        <Route path="tests/exam/:id/test" element={withSuspense(<Test />)} />
                        <Route path="messanger/*" element={withSuspense(<Messanger />)} />
                        <Route path="info/*" element={withSuspense(<Info />)} />
                        <Route path="store/*" element={withSuspense(<Store />)} />
                        <Route path="admin/*" element={withSuspense(<Admin />)} />
                        <Route path="task/*" element={withSuspense(<TasksTemplate />)} />
                        <Route path="*" element={<Navigate to={"/404"} replace />} />
                    </Route>

                    <Route path="/" element={<EmptyWrapper />}>
                        <Route path="register" element={withSuspense(<Register />)} />
                        <Route path="login" element={withSuspense(<Login />)} />
                        <Route path="recovery" element={withSuspense(<Recovery />)} />
                        <Route path="confirm" element={withSuspense(<ConfirmCode />)} />
                        <Route path="404" element={withSuspense(<NotFound />)} />
                    </Route>
                </>}
            </Routes>
        </ConfigProvider>
    );
};

export default App;