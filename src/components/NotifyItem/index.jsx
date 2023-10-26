import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import {formatDate} from '../../utils/formatDate';
import { getNotifyType } from '../../utils/getNotifyType';

import Button from '../Button';
import Modal from '../Modal';
import CustomHtmlParser from '../CustomHtmlParser';

const NotifyItem = ({data, loading = false, callback = () => {}}) => {
    const {title, content, type, date, isRead, sender} = data;

    const [modal, setModal] = React.useState(false);

    const readNotify = (e) => {
        e.preventDefault();
        setModal(true);

        if(!isRead){
            callback();
        }
    }

    return (
        <>
            <div className={`${base.item2} ${styles.notifyItem}${isRead ? ` ${styles.readed}` : ""}`}>
                <span className={styles.notifyItemWrapper}>
                    {type && <span className={`${styles.notifyItemIconInner}${getNotifyType(type)?.name === "session" ? ` ${styles.session}` : ""}`}>
                        {getNotifyType(type)?.icon}
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

                {content && <div className={`${typography.text} ${styles.notifyItemTextContent} ${base.format}`}>
                    <CustomHtmlParser html={content} />
                </div>}

                <div className={styles.notifyItemButtonInner}>
                    <div className={styles.notifyItemButtonWrap}>
                        <Button auto type="light" onClick={readNotify} className={styles.notifyItemButtonMore} disabled={loading}>
                            Подробнее
                        </Button>
                    </div>
                </div>
            </div>

            <Modal value={modal} setValue={setModal} title={title} subtitle={formatDate(date)}>
                <div className={base.format}>
                    <CustomHtmlParser html={content} />

                    {getNotifyType(type)?.name === "session" && <p className={typography.text}>
                        <Link to="/profile/safe/sessions" className={styles.notifyItemLink}>Нажмите</Link>, чтобы посмотреть всю историю активности
                    </p>}
                </div>
            </Modal>
        </>
    )
}

export default NotifyItem;