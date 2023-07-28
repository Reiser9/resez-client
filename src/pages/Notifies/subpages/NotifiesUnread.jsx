import React from 'react';
import {useSelector} from 'react-redux';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import useNotify from '../../../hooks/useNotify';

import Button from '../../../components/Button';
import NotifyItem from '../../../components/NotifyItem';
import ReloadButton from '../../../components/ReloadButton';
import NotContent from '../../../components/NotContent';
import Notify from '../../../components/Skeleton/Notify';

const NotifiesUnread = () => {
    const [notifiesMoreLoading, setNotifiesMoreLoading] = React.useState(false);

    const {notifyIsLoading, loadNotify, getAllNotify, readNotify, readAllNotifies} = useNotify();
    const {notifiesIsLoading, notifies, unreadCount} = useSelector(state => state.notify);

    const loadMoreNotifies = async () => {
        setNotifiesMoreLoading(true);
        await getAllNotify(notifies?.notifies?.length, 6, true);
        setNotifiesMoreLoading(false);
    }

    React.useEffect(() => {
        loadNotify(0, 6, true);
    }, []);

    const notifiesNotLoadingAndNotEmpty = !notifiesIsLoading && notifies.totalCount !== 0;

    return (
        <div className={styles.content}>
            <div className={styles.titleInner}>
                <div className={styles.titleWrapper}>
                    <p className={typography.h3}>Уведомления {notifiesNotLoadingAndNotEmpty && `(${notifies.totalCount || 0})`}</p>

                    <ReloadButton loading={notifiesIsLoading} onClick={() => loadNotify(0, 6, true)} />
                </div>

                {notifies.totalCount !== 0 && <Button disabled={notifiesIsLoading || unreadCount === 0} auto type="light" onClick={() => readAllNotifies(0, 6, true)}>
                    Прочитать все
                </Button>}
            </div>

            {notifiesIsLoading
            ? <div className={styles.notifiesContent}>
                {[...Array(4)].map((_, id) => <Notify key={id} />)}
            </div>
            : notifies.totalCount === 0
                ? <NotContent text="Все уведомления прочитаны" />
                : <div className={styles.notifiesContent}>
                    {notifies?.notifies
                    ?.map(data => <NotifyItem
                        key={data.id}
                        data={data}
                        callback={() => readNotify(data.id, true)}
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

export default NotifiesUnread;