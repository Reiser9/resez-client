import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import base from '../../../styles/base.module.css';
import styles from './index.module.css';

import { Code, Fire, Message, Store, Tests, Training } from '../../Icons';

import { setSidebarShow } from '../../../redux/slices/app';

import SidebarLink from '../../SidebarLink';
import Sidebar from '../../Sidebar';

const containers = {
    "full": base.containerFull,
    "basic": base.container
}

const WithSidebarWrapper = ({container = "basic", children}) => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const hideSidebar = () => {
        dispatch(setSidebarShow(false));
    }

    return (
        <div className={styles.wrapper}>
            <Sidebar>
                <SidebarLink onClick={hideSidebar} text="Тренинг" icon={<Training />} to="/training" />
                <SidebarLink onClick={hideSidebar} text="Тесты" icon={<Tests />} to="/tests" />
                <SidebarLink onClick={hideSidebar} text="Мессенджер" icon={<Message />} to="/message" disabled />
                <SidebarLink onClick={hideSidebar} text="Полезная информация" icon={<Fire />} to="/info" disabled />
                <SidebarLink onClick={hideSidebar} text="Магазин" icon={<Store />} to="/store" disabled />
                {user?.permissions?.length > 0 &&<SidebarLink onClick={hideSidebar} text="Админка" icon={<Code />} to="/admin" />}
            </Sidebar>

            <div className={styles.contentBackground}>
                <div className={`${styles.content} ${containers[container]}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default WithSidebarWrapper;