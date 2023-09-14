import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross } from '../../../../components/Icons';

import useSession from '../../../../hooks/useSession';
import useAuth from '../../../../hooks/useAuth';

import SessionItem from '../../SessionItem';
import BackButton from '../../../../components/BackButton';
import SessionItemFull from '../../../../components/Skeleton/Sessions/SessionItemFull';
import ReloadButton from '../../../../components/ReloadButton';
import NotContent from '../../../../components/NotContent';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';

const Sessions = () => {
    const [isScrollToSession, setIsScrollToSession] = React.useState(false);
    const [sessionMoreLoading, setSessionMoreLoading] = React.useState(false);

    const {error, sessionIsLoading, loadSessions, getAllSessions, endSession} = useSession();
    const {sessionsIsLoading, sessions} = useSelector(state => state.session);
    const location = useLocation();

    const {isLoading: authLoading, logout} = useAuth();

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

                <ReloadButton loading={sessionsIsLoading} onClick={() => loadSessions(0, 5, true)} />
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={sessionsIsLoading}
                dataMoreIsLoading={sessionMoreLoading}
                dataLength={sessions?.other?.length + 1}
                Skeleton={SessionItemFull}
                skeletonLoading={3}
                containerClassName={styles.sessionContent}
                errorContent={<NotContent text="Ошибка при загрузке сессий" icon={<Cross />} danger />}
                notContent={<NotContent text="Сессии не найдены" />}
                isLast={sessions?.isLast}
                loadMoreData={loadMoreSession}
            >
                <>
                    <SessionItem
                        current
                        data={sessions?.current || {}}
                        active={location?.state?.id === sessions?.current?.id}
                        callback={() => logout()}
                        loading={authLoading}
                    />

                    {sessions?.other?.map(data =>
                        <SessionItem
                            key={data.id}
                            data={data}
                            active={location?.state?.id === data.id}
                            callback={() => endSession(data.id)}
                            loading={sessionIsLoading.includes(data.id)}
                        />
                    )}
                </>
            </BlockDataWithPaggination>
        </div>
    )
}

export default Sessions;