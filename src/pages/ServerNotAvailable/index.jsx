import React from 'react';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import useAuth from '../../hooks/useAuth';

import { Server } from '../../components/Icons';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import Button from '../../components/Button';

const ServerNotAvailable = () => {
    const {reload} = useAuth();

    return (
        <TitleWrpapper pageTitle="Сервер временно недоступен">
            <div className={styles.fullPage}>
                <div className={styles.fullPageContent}>
                    <div className={styles.fullPageImg}>
                        <Server />
                    </div>

                    <h2 className={styles.fullPageTitle}><span>5</span>00</h2>

                    <p className={`${typography.h4} ${styles.fullPageText}`}>Сервер временно недоступен, вернитесь на сайт позже.</p>

                    <Button auto className={styles.fullPageButton} type="outline" onClick={reload}>
                        Перезагрузить
                    </Button>
                </div>
            </div>
        </TitleWrpapper>
    )
}

export default ServerNotAvailable;