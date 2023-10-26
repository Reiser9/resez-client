import React from 'react';
import { useSelector } from 'react-redux';
import { addStyles } from "react-mathquill";

import useAuth from '../../../hooks/useAuth';
import useCheckConnection from '../../../hooks/useCheckConnection';
import useSocket from '../../../hooks/useSocket';

import Preloader from '../../Preloader';

import ServerNotAvailable from '../../../pages/ServerNotAvailable';
import Ban from '../../../pages/Ban';
import NoConnection from '../../../pages/NoConnection';

addStyles();

const InitialWrapper = ({children}) => {
    const {appIsLoading, connection} = useSelector(state => state.app);
    const {serverAvailable} = useSelector(state => state.server);
    const {authIsLoading} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);
    const {checkAuth} = useAuth();
    useSocket();
    useCheckConnection();

    React.useEffect(() => {
        checkAuth();
    }, []);

    const {isBlocked} = user;

    if(appIsLoading || authIsLoading){
        return <Preloader />
    }

    if(!connection){
        return <NoConnection />;
    }

    if(!serverAvailable){
        return <ServerNotAvailable />
    }

    if(isBlocked){
        return <Ban />
    }

    return children;
}

export default InitialWrapper;