import React from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/useAuth';

import Preloader from '../../Preloader';

import ServerNotAvailable from '../../../pages/ServerNotAvailable';
import Ban from '../../../pages/Ban';
import ConfirmCode from '../../../pages/ConfirmCode';

const InitialWrapper = ({children}) => {
    const {appIsLoading, blocked} = useSelector(state => state.app);
    const {serverAvailable} = useSelector(state => state.server);
    const {isAuth, verified, authIsLoading} = useSelector(state => state.auth);
    const {checkAuth} = useAuth();

    React.useEffect(() => {
        checkAuth();
    }, []);

    if(appIsLoading || authIsLoading){
        return <Preloader />
    }

    if(!serverAvailable){
        return <ServerNotAvailable />
    }

    if(blocked){
        return <Ban />
    }

    if(isAuth && !verified){
        return <ConfirmCode />
    }

    return children;
}

export default InitialWrapper;