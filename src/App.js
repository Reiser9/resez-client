import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { useSelector } from "react-redux";
import ruRU from 'antd/locale/ru_RU';

import "./App.css";

import { withSuspense } from "./hoc/withSuspense";

import DefaultWrapper from "./components/Wrapper/DefaultWrapper";
import EmptyWrapper from "./components/Wrapper/EmptyWrapper";

const Main = React.lazy(() => import("./pages/Main"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Notifies = React.lazy(() => import("./pages/Notifies"));
const Admin = React.lazy(() => import("./pages/Admin"));

const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Recovery = React.lazy(() => import("./pages/Recovery"));
const ConfirmCode = React.lazy(() => import("./pages/ConfirmCode"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
    const {user} = useSelector(state => state.user);
    const {isAuth, verified} = useSelector(state => state.auth);

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: user.isPreviewTheme ? user?.previewTheme?.primary || "#007cee" : user?.theme?.primary || "#007cee",
                    fontFamily: "Nunito"
                }
            }}
        >
            <Routes>
                {isAuth && !verified
                ? <Route path="/">
                    <Route index element={withSuspense(<ConfirmCode />)} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Route>
                : <>
                    <Route path="/" element={<DefaultWrapper />}>
                        <Route index element={withSuspense(<Main />)} />
                        <Route path="profile/*" element={withSuspense(<Profile />)} />
                        <Route path="notifies/*" element={withSuspense(<Notifies />)} />
                        <Route path="admin/*" element={withSuspense(<Admin />)} />
                        <Route path="*" element={<Navigate to={"/404"} />} />
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