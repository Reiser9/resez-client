import React from 'react';

import styles from './index.module.css';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';

const ServerNotAvailable = () => {
    return (
        <TitleWrpapper pageTitle="Сервер временно недоступен">
            <div>Сервер недоступен</div>
        </TitleWrpapper>
    )
}

export default ServerNotAvailable;