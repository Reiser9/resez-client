import React from 'react';
import { Empty } from 'antd';

import styles from './index.module.css';

const NotContent = ({text, ...props}) => {
    return (
        <div className={styles.emptyContent} {...props}>
            <Empty description={text} />
        </div>
    )
}

export default NotContent;