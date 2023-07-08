import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useSession from '../../../../hooks/useSession';
import useAuth from '../../../../hooks/useAuth';

import SessionItem from '../../SessionItem';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';
import SessionItemFull from '../../../../components/Skeleton/Sessions/SessionItemFull';

const Sessions = () => {
    const [sessionMoreLoading, setSessionMoreLoading] = React.useState(false);

    const {loadSessions, getAllSessions, endSession} = useSession();
    const {sessionsIsLoading, sessions} = useSelector(state => state.session);
    const location = useLocation();

    const {logout} = useAuth();

    const loadMoreSession = async () => {
        setSessionMoreLoading(true);
        await getAllSessions(sessions?.page + 1, 6);
        setSessionMoreLoading(false);
    }

    React.useEffect(() => {
        loadSessions();
    }, []);

    return (
        <div className={styles.sessions}>
            <div className={styles.sessionsTitleWrapper}>
                <BackButton />
                
                <p className={typography.h3}>Данные о сеансах {!sessionsIsLoading && `(${sessions?.totalCount + 1 || 0})`}</p>
            </div>

            <div className={styles.sessionContent}>
                {sessionsIsLoading
                ? [...Array(3)].map((_, id) => <SessionItemFull key={id} />)
                : <>
                    <SessionItem current data={sessions?.current || {}} active={location?.state?.id === sessions?.current?.id} callback={() => logout()} />

                    {sessions?.other?.map(data => <SessionItem key={data.id} data={data} active={location?.state?.id === data.id} callback={() => endSession(data.id)} />)}
                </>}

                {sessionMoreLoading && [...Array(3)].map((_, id) => <SessionItemFull key={id} />)}
            </div>

            {!sessionsIsLoading && !sessions?.isLast
            && <Button loading={sessionMoreLoading} type="empty" auto className={styles.sessionsMoreButton} onClick={loadMoreSession}>
                Показать еще
            </Button>}
        </div>
    )
}

export default Sessions;