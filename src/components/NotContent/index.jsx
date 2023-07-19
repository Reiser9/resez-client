import React from 'react';
import { Empty } from 'antd';

import styles from './index.module.css';

const NotContent = ({text}) => {
    return (
        <div className={styles.emptyContent}>
            <Empty description={text} />
        </div>
    )
}

export default NotContent;