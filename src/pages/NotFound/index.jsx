import React from 'react';

import fullpage from '../../styles/fullpage.module.css';

import { NotFoundIcon } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import Button from '../../components/Button';
import FullPage from '../../components/FullPage';

const NotFound = () => {
    return (
        <TitleWrapper pageTitle="Страница не найдена">
            <FullPage
                icon={<NotFoundIcon />}
                code="4<span>0</span>4"
                text="К сожалению, запрашиваемая страница не найдена. Возможно, вы ошиблись при вводе адреса или страница была удалена."
            >
                <Button auto className={fullpage.fullPageButton} type="outline" to="/">
                    На главную
                </Button>
            </FullPage>
        </TitleWrapper>
    )
}

export default NotFound;