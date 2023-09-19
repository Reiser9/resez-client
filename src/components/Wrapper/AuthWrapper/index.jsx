import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Preloader from '../../Preloader';

const AuthWrapper = ({children}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {authIsLoading, isAuth} = useSelector(state => state.auth);
    const location = useLocation();

    if(appIsLoading || authIsLoading){
        return <Preloader fill />
    }

    if(!isAuth){
        return <Navigate to="/login" state={{redirect: location.pathname}} replace />
    }

    return children;
}

export default AuthWrapper;