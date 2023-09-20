import React from 'react';
import {useSelector} from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from '../../index.module.css';

import useSession from '../../../../hooks/useSession';

import ReloadButton from '../../../../components/ReloadButton';
import SessionBlock from './SessionBlock';
import ChangePassword from './ChangePassword';

const SafeMain = () => {
    const {loadSessions} = useSession();
    const {sessionsIsLoading} = useSelector(state => state.session);

    return (
        <>
            <div className={styles.contentBlock}>
                <div className={base.titleInner}>
                    <p className={typography.h3}>
                        Активность
                    </p>

                    <ReloadButton loading={sessionsIsLoading} onClick={() => loadSessions(0, 5, true)} />
                </div>

                <SessionBlock />
            </div>
            
            <div className={styles.contentBlock}>
                <p className={typography.h3}>
                    Смена пароля
                </p>

                <ChangePassword />
            </div>
        </>
    )
}

export default SafeMain;