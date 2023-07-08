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
import ReloadButton from '../../../../components/ReloadButton';

const Sessions = () => {
    const [isScrollToSession, setIsScrollToSession] = React.useState(false);
    const [sessionMoreLoading, setSessionMoreLoading] = React.useState(false);

    const {loadSessions, getAllSessions, endSession} = useSession();
    const {sessionsIsLoading, sessions} = useSelector(state => state.session);
    const location = useLocation();

    const {logout} = useAuth();

    const loadMoreSession = async () => {
        setSessionMoreLoading(true);
        await getAllSessions(sessions?.other?.length, 6);
        setSessionMoreLoading(false);
    }

    React.useEffect(() => {
        loadSessions();
    }, []);

    React.useEffect(() => {
        if(sessions.other && location?.state?.id && !isScrollToSession){
            const sessionId = location?.state?.id;

            const currentElement = document.querySelector(`[data-session="${sessionId}"]`);
            
            currentElement.scrollIntoView({
                behavior: "smooth",
            });
            setIsScrollToSession(true);
        }
    }, [sessions.other]);

    return (
        <div className={styles.sessions}>
            <div className={styles.sessionsTitleInner}>
                <div className={styles.sessionsTitleWrapper}>
                    <BackButton />
                    
                    <p className={typography.h3}>Сеансы {!sessionsIsLoading && `(${sessions?.totalCount + 1 || 0})`}</p>
                </div>

                <ReloadButton onClick={() => loadSessions(0, 5, true)} />
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