import React from 'react';

import fullpage from '../../styles/fullpage.module.css';

import useAuth from '../../hooks/useAuth';

import { Server } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import Button from '../../components/Button';
import FullPage from '../../components/FullPage';

const ServerNotAvailable = () => {
    const {reload} = useAuth();

    return (
        <TitleWrapper pageTitle="Сервер временно недоступен">
            <FullPage
                icon={<Server />}
                code="<span>5</span>00"
                text="Сервер временно недоступен, вернитесь на сайт позже."
            >
                <Button auto className={fullpage.fullPageButton} type="outline" onClick={reload}>
                    Перезагрузить
                </Button>
            </FullPage>
        </TitleWrapper>
    )
}

export default ServerNotAvailable;