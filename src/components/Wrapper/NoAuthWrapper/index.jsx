import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Preloader from '../../Preloader';

const NoAuthWrapper = ({children}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {isAuth} = useSelector(state => state.auth);
    const location = useLocation();

    if(appIsLoading){
        return <Preloader fill />
    }

    if(isAuth){
        return <Navigate to={`${location.state?.redirect || "/"}`} replace />
    }

    return children;
}

export default NoAuthWrapper;