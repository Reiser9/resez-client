import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { checkPermission } from '../../../utils/checkPermission';

import Preloader from '../../Preloader';

const PrivateWrapper = ({
    permissions = [],
    children
}) => {
    const {appIsLoading} = useSelector(state => state.app);
    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);

    if(appIsLoading){
        return <Preloader fill />
    }

    if(!isAuth || !checkPermission(user?.permissions, permissions)){
        return <Navigate to="/404" replace />
    }

    return children;
}

export default PrivateWrapper;