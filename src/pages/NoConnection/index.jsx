import React from 'react';

import { Connection } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import FullPage from '../../components/FullPage';

const NoConnection = () => {
    return (
        <TitleWrapper pageTitle="Нет подключения к интернету">
            <FullPage
                icon={<Connection />}
                code="5<span>0</span>3"
                text="Ошибка подключения к сети интернет."
            />
        </TitleWrapper>
    )
}

export default NoConnection;