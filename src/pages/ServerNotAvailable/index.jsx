import React from 'react';

import typography from '../../styles/typography.module.css';
import fullpage from '../../styles/fullpage.module.css';

import useAuth from '../../hooks/useAuth';

import { Server } from '../../components/Icons';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import Button from '../../components/Button';

const ServerNotAvailable = () => {
    const {reload} = useAuth();

    return (
        <TitleWrpapper pageTitle="Сервер временно недоступен">
            <div className={fullpage.fullPage}>
                <div className={fullpage.fullPageContent}>
                    <div className={fullpage.fullPageImg}>
                        <Server />
                    </div>

                    <h2 className={fullpage.fullPageTitle}><span>5</span>00</h2>

                    <p className={`${typography.h4} ${fullpage.fullPageText}`}>Сервер временно недоступен, вернитесь на сайт позже.</p>

                    <Button auto className={fullpage.fullPageButton} type="outline" onClick={reload}>
                        Перезагрузить
                    </Button>
                </div>
            </div>
        </TitleWrpapper>
    )
}

export default ServerNotAvailable;