import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { removeNotify } from '../../redux/slices/notify';

import { getNotifyByType } from '../../utils/getNotifyByType';

const Notify = ({data}) => {
    const {id, title, text, type, to, time} = data;

    const notifyTimeout = React.useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const remove = React.useCallback(() => {
        dispatch(removeNotify(id));
    }, [dispatch, id]);

    const removeOnClick = () => {
        if(to){
            navigate(to);
        }

        remove();
        clearTimeout(notifyTimeout.current);
    }

    React.useEffect(() => {
        notifyTimeout.current = setTimeout(remove, time);

        return () => clearTimeout(notifyTimeout.current);
    }, [remove, time]);

    return (
        <div className={`${styles.notifyItem} ${getNotifyByType(type).class}`} onClick={removeOnClick}>
            <div className={styles.notifyItemIconWrapper}>
                {getNotifyByType(type).icon}
            </div>

            <div className={styles.notifyItemWrapper}>
                <p className={typography.h4}>{title}</p>

                <p className={typography.text2}>{text}</p>
            </div>
        </div>
    )
}

export default Notify;