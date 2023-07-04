import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Desktop, Mobile } from '../../../../components/Icons';

import useSession from '../../../../hooks/useSession';

import Button from '../../../../components/Button';
import SessionItem from '../../SessionItem';

const Sessions = () => {
    const {isLoading, getAllSessions} = useSession();
    const {sessions} = useSelector(state => state.session);

    React.useEffect(() => {
        getAllSessions();
    }, []);

    return (
        <div className={styles.sessions}>
            <p className={typography.h3}>Данные о сессиях</p>

            <div className={styles.sessionContent}>
                <SessionItem current data={sessions?.current || {}} />

                {sessions?.other?.map(data => <SessionItem key={data.id} data={data} />)}
            </div>
        </div>
    )
}

export default Sessions;