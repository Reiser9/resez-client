import React from 'react';
import { Tooltip } from 'antd';

import styles from './index.module.css';

import {Reload} from '../Icons';

const ReloadButton = ({loading = false, ...props}) => {
    return (
        <Tooltip title="Перезагрузить">
            <button className={`${styles.reload}${loading ? ` ${styles.loading}` : ""}`} {...props}>
                <Reload />
            </button>
        </Tooltip>
    )
}

export default ReloadButton;