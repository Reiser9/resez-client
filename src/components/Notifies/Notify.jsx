import React from 'react';
import { useDispatch } from 'react-redux';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Warn, Error, Success, Info } from '../Icons';
import { removeNotify } from '../../redux/slices/notify';

const notifyTypes = {
    "success": {
        icon: <Success />,
        class: styles.success
    },
    "info": {
        icon: <Info />,
        class: styles.info
    },
    "warn": {
        icon: <Warn />,
        class: styles.warn
    },
    "error": {
        icon: <Error />,
        class: styles.error
    }
}

const Notify = ({data}) => {
    const {id, title, text, type, time} = data;

    const notifyTimeout = React.useRef();

    const dispatch = useDispatch();

    const remove = React.useCallback(() => {
        dispatch(removeNotify(id));
    }, [dispatch, id]);

    const removeOnClick = () => {
        remove();
        clearTimeout(notifyTimeout.current);
    }

    React.useEffect(() => {
        notifyTimeout.current = setTimeout(remove, time);

        return () => clearTimeout(notifyTimeout.current);
    }, [remove, time]);

    return (
        <div className={`${styles.notifyItem} ${notifyTypes[type].class}`} onClick={removeOnClick}>
            <div className={styles.notifyItemIconWrapper}>
                {notifyTypes[type].icon}
            </div>

            <div className={styles.notifyItemWrapper}>
                <p className={typography.h4}>{title}</p>

                <p className={typography.text2}>{text}</p>
            </div>
        </div>
    )
}

export default Notify;