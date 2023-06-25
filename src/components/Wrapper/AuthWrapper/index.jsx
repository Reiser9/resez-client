import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Preloader from '../../Preloader';

const AuthWrapper = ({children}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {isAuth} = useSelector(state => state.auth);

    if(appIsLoading){
        return <Preloader fill />
    }

    if(!isAuth){
        return <Navigate to="/login" />
    }

    return children;
}

export default AuthWrapper;