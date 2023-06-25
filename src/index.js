import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ConfigProvider } from 'antd';

import 'react-loading-skeleton/dist/skeleton.css';

import App from './App';
import Notifies from './components/Notifies';
import InitialWrapper from "./components/Wrapper/InitialWrapper";
import ThemeWrapper from "./components/Wrapper/ThemeWrapper";

import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const themeColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue('--main');

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeWrapper>
                <InitialWrapper>
                    <SkeletonTheme baseColor="#ededed" highlightColor="#d8d8d8">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: themeColor,
                                    fontFamily: "Nunito"
                                }
                            }}
                        >
                            <App />
                        </ConfigProvider>
                    </SkeletonTheme>
                </InitialWrapper>

                <Notifies />
            </ThemeWrapper>
        </BrowserRouter>
    </Provider>
);