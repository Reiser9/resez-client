import React from 'react';

import fullpage from '../../styles/fullpage.module.css';

import { Blocked } from '../../components/Icons';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';
import FullPage from '../../components/FullPage';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';

const Ban = () => {
    const {logout} = useAuth();

    return (
        <TitleWrapper pageTitle="Вы заблокированы">
            <FullPage
                icon={<Blocked />}
                code="4<span>0</span>3"
                text="Ваша учетная запись заблокирована."
            >
                <Button auto className={fullpage.fullPageButton} type="outline" onClick={() => logout()}>
                    Выйти
                </Button>
            </FullPage>
        </TitleWrapper>
    )
}

export default Ban;