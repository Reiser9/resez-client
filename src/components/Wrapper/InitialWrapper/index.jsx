import React from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/useAuth';
import useCheckConnection from '../../../hooks/useCheckConnection';

import Preloader from '../../Preloader';

import ServerNotAvailable from '../../../pages/ServerNotAvailable';
import Ban from '../../../pages/Ban';
import NoConnection from '../../../pages/NoConnection';

const InitialWrapper = ({children}) => {
    const {appIsLoading, blocked, connection} = useSelector(state => state.app);
    const {serverAvailable} = useSelector(state => state.server);
    const {authIsLoading} = useSelector(state => state.auth);
    const {checkAuth} = useAuth();
    useCheckConnection();

    React.useEffect(() => {
        checkAuth();
    }, []);

    if(appIsLoading || authIsLoading){
        return <Preloader />
    }

    if(!connection){
        return <NoConnection />;
    }

    if(!serverAvailable){
        return <ServerNotAvailable />
    }

    if(blocked){
        return <Ban />
    }

    return children;
}

export default InitialWrapper;