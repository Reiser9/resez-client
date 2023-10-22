import React from 'react';

import styles from './index.module.css';

import { Info } from '../Icons';

import InnerSidebar from '../InnerSidebar';

const InfoSidebar = ({
    value,
    setValue,
    children,
    ...props
}) => {
    return (
        <InnerSidebar value={value} setValue={setValue} icon={<Info />} className={styles.taskSidebar} big {...props}>
            {children}
        </InnerSidebar>
    )
}

export default InfoSidebar;