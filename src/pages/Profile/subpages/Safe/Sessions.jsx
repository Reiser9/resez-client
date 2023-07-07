import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useSession from '../../../../hooks/useSession';

import SessionItem from '../../SessionItem';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';

const Sessions = () => {
    const {isLoading, getAllSessions} = useSession();
    const {sessions} = useSelector(state => state.session);
    const location = useLocation();

    React.useEffect(() => {
        getAllSessions(1, 5);
    }, []);

    return (
        // Скелетон
        <div className={styles.sessions}>
            <div className={styles.sessionsTitleWrapper}>
                <BackButton />
                
                <p className={typography.h3}>Данные о сессиях ({sessions?.totalCount + 1 || 0})</p>
            </div>

            <div className={styles.sessionContent}>
                <SessionItem current data={sessions?.current || {}} active={location?.state?.id === sessions?.current?.id} />

                {sessions?.other?.map(data => <SessionItem key={data.id} data={data} active={location?.state?.id === data.id} />)}
            </div>

            <Button type="empty" auto className={styles.sessionsMoreButton}>
                Показать еще
            </Button>
        </div>
    )
}

export default Sessions;