import React from 'react';

import typography from '../../styles/typography.module.css';
import fullpage from '../../styles/fullpage.module.css';

import { NotFoundIcon } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import Button from '../../components/Button';

const NotFound = () => {
    return (
        <TitleWrapper pageTitle="Страница не найдена">
            <div className={fullpage.fullPage}>
                <div className={fullpage.fullPageContent}>
                    <div className={fullpage.fullPageImg}>
                        <NotFoundIcon />
                    </div>

                    <h2 className={fullpage.fullPageTitle}>4<span>0</span>4</h2>

                    <p className={`${typography.h4} ${fullpage.fullPageText}`}>
                        К сожалению, запрашиваемая страница не найдена. Возможно, вы ошиблись при вводе адреса или страница была удалена.
                    </p>

                    <Button auto className={fullpage.fullPageButton} type="outline" to="/">
                        На главную
                    </Button>
                </div>
            </div>
        </TitleWrapper>
    )
}

export default NotFound;