import React from 'react';
import {useSelector} from 'react-redux';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import {Notify as NotifyIcon} from '../../../components/Icons';

import useNotify from '../../../hooks/useNotify';

import Button from '../../../components/Button';
import NotifyItem from '../../../components/NotifyItem';
import ReloadButton from '../../../components/ReloadButton';
import NotContent from '../../../components/NotContent';
import Notify from '../../../components/Skeleton/Notify';

const NotifiesMain = ({unread = false}) => {
    const [notifiesMoreLoading, setNotifiesMoreLoading] = React.useState(false);

    const {isLoading, error, notifyIsLoading, loadNotify, getAllNotify, readNotify, readAllNotifies} = useNotify();
    const {notifiesIsLoading, notifies, unreadCount} = useSelector(state => state.notify);

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
        <div className={styles.content}>
            <div className={styles.titleInner}>
                <div className={styles.titleWrapper}>
                    <p className={typography.h3}>Уведомления {notifiesNotLoadingAndNotEmpty && `(${notifies.totalCount || 0})`}</p>

                    <ReloadButton loading={notifiesIsLoading} onClick={() => loadNotify(0, 6, unread)} />
                </div>

                {notifies.totalCount !== 0 && <Button disabled={notifiesIsLoading || unreadCount === 0 || isLoading} auto type="light" onClick={() => readAllNotifies(0, 6, unread)}>
                    Прочитать все
                </Button>}
            </div>

            {notifiesIsLoading
            ? <div className={styles.notifiesContent}>
                {[...Array(4)].map((_, id) => <Notify key={id} />)}
            </div>
            : error ? <NotContent text="Ошибка при загрузке уведомлений" />
            : notifies.totalCount === 0
                ? <NotContent text={unread ? "Все уведомления прочитаны" : "Уведомлений не найдено"} icon={<NotifyIcon />} />
                : <div className={styles.notifiesContent}>
                    {notifies?.notifies
                    ?.map(data => <NotifyItem
                        key={data.id}
                        data={data}
                        callback={() => readNotify(data.id, unread)}
                        loading={notifyIsLoading.includes(data.id)}
                    />)}
                </div>
            }

            {notifiesMoreLoading && <div className={styles.notifiesContent}>
                {[...Array(2)].map((_, id) => <Notify key={id} />)}
            </div>}

            {!notifiesIsLoading && !notifies?.isLast && <Button loading={notifiesMoreLoading} type="empty" auto className={styles.notifiesMoreButton} onClick={loadMoreNotifies}>
                Показать еще
            </Button>}
        </div>
    )
}

export default NotifiesMain;