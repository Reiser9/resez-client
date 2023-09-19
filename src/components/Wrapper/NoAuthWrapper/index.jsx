import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Preloader from '../../Preloader';

const NoAuthWrapper = ({children}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {authIsLoading, isAuth} = useSelector(state => state.auth);
    const location = useLocation();

    if(appIsLoading || authIsLoading){
        return <Preloader fill />
    }

    if(isAuth){
        return <Navigate to={location.state?.redirect || "/"} replace state={null} />
    }

    return children;
}

export default NoAuthWrapper;