import React from 'react';

import typography from '../../styles/typography.module.css';
import fullpage from '../../styles/fullpage.module.css';

import { Connection } from '../../components/Icons';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';

const NoConnection = () => {
    return (
        <TitleWrpapper pageTitle="Нет подключения к интернету">
            <div className={fullpage.fullPage}>
                <div className={fullpage.fullPageContent}>
                    <div className={fullpage.fullPageImg}>
                        <Connection />
                    </div>

                    <h2 className={fullpage.fullPageTitle}>5<span>0</span>3</h2>

                    <p className={`${typography.h4} ${fullpage.fullPageText}`}>Ошибка подключения к сети интернет.</p>
                </div>
            </div>
        </TitleWrpapper>
    )
}

export default NoConnection;