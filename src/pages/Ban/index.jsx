import React from 'react';

import typography from '../../styles/typography.module.css';
import fullpage from '../../styles/fullpage.module.css';
import styles from './index.module.css';

import { Blocked } from '../../components/Icons';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';

const Ban = () => {
    const {logout} = useAuth();

    return (
        <div className={fullpage.fullPage}>
            <div className={fullpage.fullPageContent}>
                <div className={fullpage.fullPageImg}>
                    <Blocked />
                </div>

                <h2 className={fullpage.fullPageTitle}>4<span>0</span>3</h2>

                <p className={`${typography.h4} ${fullpage.fullPageText}`}>
                    Ваша учетная запись заблокирована.
                </p>

                <Button auto className={fullpage.fullPageButton} type="outline" onClick={() => logout()}>
                    Выйти
                </Button>
            </div>
        </div>
    )
}

export default Ban;