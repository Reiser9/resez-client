import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import { Cross } from '../../../../components/Icons';

import useSession from '../../../../hooks/useSession';

import Button from '../../../../components/Button';
import SessionsSkeleton from '../../../../components/Skeleton/Sessions';
import SessionItemCompact from '../../../../components/SessionItem/SessionItemCompact';
import NotContent from '../../../../components/NotContent';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

const SessionBlock = () => {
    const [confirmEndSessions, setConfirmEndSessions] = React.useState(false);

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
                ? <NotContent text="Ошибка при загрузке сеансов" icon={<Cross />} danger />
                : <>
                    <div className={base.baseWrapperGap8}>
                        <p className={typography.text}>Текущий сеанс</p>

                        <SessionItemCompact current data={sessions?.current || {}} onClick={() => seeSessionFull(sessions?.current?.id)} />

                        {sessions?.totalCount > 0 && <Button loading={isLoading} type="empty" theme="danger" onClick={() => setConfirmEndSessions(true)}>
                            Завершить другие сеансы
                        </Button>}
                    </div>

                    {sessions?.totalCount > 0 && <div className={base.baseWrapperGap8}>
                        <p className={typography.text}>Все сеансы ({sessions?.totalCount + 1 || 0})</p>
                        
                        {sessions?.other?.slice(0, 3).map(data => <SessionItemCompact key={data.id} data={data} onClick={() => seeSessionFull(data.id)} />)}

                        {sessions?.totalCount > 3 && <Button type="empty" to="sessions">
                            Показать все
                        </Button>}
                    </div>}
                </>}

            <ConfirmModal
                value={confirmEndSessions}
                setValue={setConfirmEndSessions}
                callback={endAllSessions}
                text="Вы действительно хотите завершить все сессии, кроме текущей?"
                confirmText="Завершить"
                rejectText="Отмена"
            />
        </>
    )
}

export default SessionBlock;