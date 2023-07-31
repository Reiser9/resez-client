import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Preloader from '../../Preloader';

const PrivateWrapper = ({children}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);

    if(appIsLoading){
        return <Preloader fill />
    }

    if(!isAuth || user?.permissions?.length <= 0){
        return <Navigate to="/404" replace />
    }

    return children;
}

export default PrivateWrapper;