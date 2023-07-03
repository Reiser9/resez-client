import React from 'react';

import styles from './index.module.css';

import AuthWrapper from '../../components/Wrapper/AuthWrapper';
import TitleWrpapper from '../../components/Wrapper/TitleWrapper';

const Profile = () => {
    return (
        <AuthWrapper>
            <TitleWrpapper pageTitle="ResEz - Профиль">
                <div>Profile</div>
            </TitleWrpapper>
        </AuthWrapper>
    )
}

export default Profile;