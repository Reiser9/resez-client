import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNotify } from '../redux/slices/notify';

const useAlert = () => {
    const dispatch = useDispatch();
    
    const {notifiesLocal} = useSelector(state => state.notify);

    const alertNotify = (title, text, type = "success", to = "", time = 2000) => {
        if(notifiesLocal.length >= 3){
            return;
        }
        
        const idNotify = new Date().getTime();

        const notifyObject = {
            id: idNotify,
            title,
            text,
            type,
            to,
            time
        }

        dispatch(addNotify(notifyObject));
    }

    return{
        alertNotify
    }
}

export default useAlert;