import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from '../../index.module.css';

import useSession from '../../../../hooks/useSession';

import Button from '../../../../components/Button';
import SessionsSkeleton from '../../../../components/Skeleton/Sessions';
import SessionItemCompact from '../../SessionItemCompact';
import NotContent from '../../../../components/NotContent';

const SessionBlock = () => {
    const {isLoading, error, loadSessions, endAllSessions} = useSession();
    const {sessionsIsLoading, sessions} = useSelector(state => state.session);
    const navigate = useNavigate();

    const seeSessionFull = (id) => {
        navigate("sessions", {state: {id}})
    }

    React.useEffect(() => {
        loadSessions();
    }, []);

    return (
        <>
            {sessionsIsLoading
            ? <SessionsSkeleton />
            : error
                ? <NotContent text="Ошибка при загрузке данных" />
                : <>
                    <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Текущий сеанс</p>

                        <SessionItemCompact current data={sessions?.current || {}} onClick={() => seeSessionFull(sessions?.current?.id)} />

                        {sessions?.totalCount > 0 && <Button loading={isLoading} type="empty" theme="danger" onClick={endAllSessions}>
                            Завершить другие сеансы
                        </Button>}
                    </div>

                    {sessions?.totalCount > 0 && <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Все сеансы ({sessions?.totalCount + 1 || 0})</p>
                        
                        {sessions?.other?.slice(0, 3).map(data => <SessionItemCompact key={data.id} data={data} onClick={() => seeSessionFull(data.id)} />)}

                        {sessions?.totalCount > 3 && <Button type="empty" to="sessions">
                            Показать все
                        </Button>}
                    </div>}
                </>}
        </>
    )
}

export default SessionBlock;