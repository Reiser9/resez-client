import React from 'react';
import Skeleton from 'react-loading-skeleton';

import skeleton from '../../../styles/skeleton.module.css';
import element from '../../../pages/Profile/index.module.css';
import styles from './index.module.css';

import SessionItemCompact from './SessionItemCompact';
import Button from '../Button';

const Sessions = () => {
    return (
        <>
            <div className={element.sessionWrapper}>
                <Skeleton containerClassName={styles.sessionSubtitle} className={skeleton.skeletonContent} />

                <SessionItemCompact />

                <Button />
            </div>

            <div className={element.sessionWrapper}>
                <Skeleton containerClassName={styles.sessionSubtitle} className={skeleton.skeletonContent} />

                {[...Array(3)].map((_, id) => <SessionItemCompact key={id} />)}

                <Button />
            </div>
        </>
    )
}

export default Sessions;