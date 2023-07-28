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
    const {title, content, type, date, isRead} = data;

    const [modal, setModal] = React.useState(false);

    const readNotify = (e) => {
        e.preventDefault();
        callback();
    }

    return (
        <>
            <div className={`${styles.notifyItem}${!isRead ? ` ${styles.unread}` : ""}`}>
                <span className={styles.notifyItemWrapper}>
                    <span className={styles.notifyItemContent}>
                        {type && <span className={`${styles.notifyItemIconInner}${type === "session" ? ` ${styles.session}` : ""}`}>
                            {notifyTypes[type]}
                        </span>}

                        <span className={styles.notifyItemTitleInner}>
                            {title && <p className={`${typography.h4} ${styles.notifyItemTitle}`}>
                                {title}
                            </p>}

                            {date && <p className={`${typography.text2} ${styles.notifyItemDate}`}>
                                {formatDate(date)}
                            </p>}
                        </span>
                    </span>

                    {!isRead && <Tooltip title="Пометить как прочитанное">
                        <IconButton type="light" onClick={readNotify} disabled={loading}>
                            <Eye />
                        </IconButton>
                    </Tooltip>}
                </span>

                {content && <p className={`${typography.text} ${styles.notifyItemText} ${styles.notifyItemTextContent}`}>
                    {content}
                </p>}

                {type === "session" && <p className={`${typography.text} ${styles.notifyItemText}`}>
                    <Link to="/profile/safe/sessions" className={styles.notifyItemLink}>Нажмите</Link>, чтобы посмотреть всю историю активности
                </p>}

                <Button auto type="light" className={styles.notifyItemButton} onClick={() => setModal(true)}>
                    Подробнее
                </Button>
            </div>

            <Modal value={modal} setValue={setModal} title={title} subtitle={formatDate(date)} text={content} />
        </>
    )
}

export default NotifyItem;