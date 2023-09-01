import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import App from './App';
import Notifies from './components/Notifies';
import InitialWrapper from "./components/Wrapper/InitialWrapper";
import ThemeWrapper from "./components/Wrapper/ThemeWrapper";
import ChangeThemeAnimate from './components/ChangeThemeAnimate';

import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeWrapper>
                <ChangeThemeAnimate />

                <InitialWrapper>
                    <SkeletonTheme baseColor="var(--input)" highlightColor="var(--inputDarken)">
                        <App />
                    </SkeletonTheme>
                </InitialWrapper>

                <Notifies />
            </ThemeWrapper>
        </BrowserRouter>
    </Provider>
);