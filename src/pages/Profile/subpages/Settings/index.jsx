import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import SettingsItem from '../../../../components/SettingsItem';

const Settings = () => {
    const {user} = useSelector(state => state.user);
    const {settings} = user || {};
    const {isPrivateAccount, isShowAvatars} = settings || {};

    return (
        <div className={base.baseWrapperGap16}>
            <p className={typography.h3}>Настройки</p>

            <div className={styles.settingsItem}>
                <p className={styles.settingsItemTitle}>Основные</p>

                <div className={styles.settingsItemContent}>
                    <SettingsItem
                        title="Приватный профиль"
                        text="Данные вашего профиля буду скрыты, они будут видны только друзьям"
                        checked={isPrivateAccount}
                    />

                    <SettingsItem
                        title="Скрыть аватарки пользователей"
                        text="Скрывает отображение аватарок других пользователей. Полезно для слабого интернета"
                        checked={isShowAvatars}
                    />
                </div>
            </div>
        </div>
    )
}

export default Settings;