import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Eye, News, Warn } from '../Icons';

import {formatDate} from '../../utils/formatDate';

import Button from '../Button';
import IconButton from '../IconButton';
import Modal from '../Modal';

const notifyTypes = {
    "info": <News />,
    "session": <Warn />
}

const NotifyItem = ({data, loading = false, callback = () => {}}) => {
    const {title, content, type, date, isRead, sender} = data;

    const [modal, setModal] = React.useState(false);

    const readNotify = (e) => {
        e.preventDefault();
        callback();
    }

    const readMore = () => {
        setModal(true);
    }

    return (
        <>
            <div className={`${styles.notifyItem}${!isRead ? ` ${styles.unread}` : ""}`}>
                <span className={styles.notifyItemWrapper}>
                    {type && <span className={`${styles.notifyItemIconInner}${type === "session" ? ` ${styles.session}` : ""}`}>
                        {notifyTypes[type]}
                    </span>}

                    <span className={styles.notifyItemTitleInner}>
                        {sender && <p className={`${typography.text2} ${styles.notifyItemFrom}`}>
                            <span>От:</span> {sender}
                        </p>}

                        {title && <p className={`${typography.h4} ${styles.notifyItemTitle}`}>
                            {title}
                        </p>}

                        {date && <p className={`${typography.text2} ${styles.notifyItemDate}`}>
                            {formatDate(date)}
                        </p>}
                    </span>
                </span>

                {content && <div className={`${typography.text} ${styles.notifyItemTextContent}`}>
                    {content}

                    {type === "session" && <p className={`${typography.text}`}>
                        <Link to="/profile/safe/sessions" className={styles.notifyItemLink}>Нажмите</Link>, чтобы посмотреть всю историю активности
                    </p>}
                </div>}

                <div className={styles.notifyItemButtonInner}>
                    <div className={styles.notifyItemButtonWrap}>
                        <Button auto type="light" onClick={readMore} className={styles.notifyItemButtonMore}>
                            Подробнее
                        </Button>

                        {!isRead && <Tooltip title="Пометить как прочитанное">
                            <IconButton type="light" onClick={readNotify} disabled={loading}>
                                <Eye />
                            </IconButton>
                        </Tooltip>}
                    </div>
                </div>
            </div>

            <Modal value={modal} setValue={setModal} title={title} subtitle={formatDate(date)}>
                {content}

                {type === "session" && <p className={typography.text}>
                    <Link to="/profile/safe/sessions" className={styles.notifyItemLink}>Нажмите</Link>, чтобы посмотреть всю историю активности
                </p>}
            </Modal>
        </>
    )
}

export default NotifyItem;