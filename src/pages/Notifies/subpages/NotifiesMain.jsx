import React from 'react';
import {useSelector} from 'react-redux';

import base from '../../../styles/base.module.css';
import typography from '../../../styles/typography.module.css';

import {Cross, Notify as NotifyIcon} from '../../../components/Icons';

import useNotify from '../../../hooks/useNotify';

import Button from '../../../components/Button';
import NotifyItem from '../../../components/NotifyItem';
import ReloadButton from '../../../components/ReloadButton';
import NotContent from '../../../components/NotContent';
import Notify from '../../../components/Skeleton/Notify';
import BlockDataWithPaggination from '../../../components/BlockDataWithPaggination';

const NotifiesMain = ({unread = false}) => {
    const [notifiesMoreLoading, setNotifiesMoreLoading] = React.useState(false);

    const {error, isLoading, notifyIsLoading, loadNotify, getAllNotify, readNotify, readAllNotifies} = useNotify();
    const {notifiesIsLoading, notifies} = useSelector(state => state.notify);
    const {user} = useSelector(state => state.user);

    const loadMoreNotifies = React.useCallback(async () => {
        setNotifiesMoreLoading(true);
        await getAllNotify(notifies?.notifies?.length, 6, unread);
        setNotifiesMoreLoading(false);
    }, [unread, notifies.notifies]);

    React.useEffect(() => {
        loadNotify(0, 6, unread);
    }, [unread]);

    React.useEffect(() => {
        if(unread && notifies?.notifies?.length === 0 && !notifies?.isLast){
            loadMoreNotifies();
        }
    }, [notifies?.notifies, unread, notifies?.isLast]);

    const notifiesNotLoadingAndNotEmpty = !notifiesIsLoading && notifies.totalCount !== 0;

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Уведомления {notifiesNotLoadingAndNotEmpty && `(${notifies.totalCount || 0})`}</p>

                    <ReloadButton loading={notifiesIsLoading} onClick={() => loadNotify(0, 6, unread)} />
                </div>

                {notifies.totalCount !== 0 && <Button disabled={notifiesIsLoading || user?.unreadNotifiesCount === 0 || isLoading} auto type="light" onClick={() => readAllNotifies(0, 6, unread)}>
                    Прочитать все
                </Button>}
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={notifiesIsLoading}
                dataMoreIsLoading={notifiesMoreLoading}
                dataLength={notifies?.notifies?.length}
                Skeleton={Notify}
                skeletonLoading={4}
                skeletonMoreLoading={2}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке уведомлений" icon={<Cross />} danger />}
                notContent={<NotContent text={unread ? "Все уведомления прочитаны" : "Уведомлений не найдено"} />}
                isLast={notifies?.isLast}
                loadMoreData={loadMoreNotifies}
            >
                <div className={base.contentItems}>
                    {notifies?.notifies
                    ?.map(data => <NotifyItem
                        key={data.id}
                        data={data}
                        callback={() => readNotify(data.id)}
                        loading={notifyIsLoading.includes(data.id)}
                    />)}
                </div>
            </BlockDataWithPaggination>
        </div>
    )
}

export default NotifiesMain;