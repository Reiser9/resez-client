import React from 'react';

import base from '../../../styles/base.module.css';
import styles from './index.module.css';

import { Code, Fire, Message, Tests, Training, Trophy } from '../../Icons';

import SidebarLink from '../../SidebarLink';

const containers = {
    "full": base.containerFull,
    "basic": base.container
}

const WithSidebarWrapper = ({container = "basic", children}) => {
    return (
        <div className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <SidebarLink text="Тренинг" icon={<Training />} to="/training" />
                <SidebarLink text="Тесты" icon={<Tests />} to="/tests" />
                <SidebarLink text="Мессенджер" icon={<Message />} to="/message" />
                <SidebarLink text="Полезная информация" icon={<Fire />} to="/info" />
                <SidebarLink text="Достижения" icon={<Trophy />} to="/achievements" />
                <SidebarLink text="Админка" icon={<Code />} to="/admin" />
            </aside>

            <div className={styles.contentBackground}>
                <div className={`${styles.content} ${containers[container]}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default WithSidebarWrapper;