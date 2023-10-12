import React from 'react';
import { Switch } from 'antd';

import styles from './index.module.css';

const SettingsItem = ({
    title,
    text,
    checked,
    loading = false,
    callback = () => {},
    ...props
}) => {
    return (
        <div className={styles.settingsBlock} {...props}>
            <div className={styles.settingsBlockWrapper} onClick={callback}>
                <p className={styles.settingsBlockName}>{title}</p>

                <Switch
                    size="small"
                    checked={checked}
                    loading={loading}
                />
            </div>

            <p className={styles.settingsBlockDescription}>
                {text}
            </p>
        </div>
    )
}

export default SettingsItem;