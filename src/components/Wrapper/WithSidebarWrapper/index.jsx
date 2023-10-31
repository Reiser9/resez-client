import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import base from '../../../styles/base.module.css';
import sidebar from '../../Sidebar/index.module.css';
import styles from './index.module.css';

import { Code, Console, Fire, Lifebuoy, Message, Store, Tests, Training, Vk } from '../../Icons';

import { PERMISSIONS } from '../../../consts/PERMISSIONS';
import { checkPermission } from '../../../utils/checkPermission';

import { setSidebarShow } from '../../../redux/slices/app';

import SidebarLink from '../../SidebarLink';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import Button from '../../Button';

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
                <div className={styles.sidebarMenu}>
                    <SidebarLink onClick={hideSidebar} text="Тренинг" icon={<Training />} to="/training" />
                    <SidebarLink onClick={hideSidebar} text="Тесты" icon={<Tests />} to="/tests" />
                    <SidebarLink onClick={hideSidebar} text="Мессенджер" icon={<Message />} to="/messanger" />
                    <SidebarLink onClick={hideSidebar} text="Полезное" icon={<Fire />} to="/info" />
                    <SidebarLink onClick={hideSidebar} text="Магазин" icon={<Store />} to="/store" />
                    {checkPermission(user?.permissions, [PERMISSIONS.ADMIN]) && <SidebarLink onClick={hideSidebar} text="Админка" icon={<Code />} to="/admin" />}
                    {checkPermission(user?.permissions, [PERMISSIONS.CONFIG]) && <SidebarLink onClick={hideSidebar} text="Конфигурация" icon={<Console />} to="/config" />}
                </div>

                <div className={sidebar.sidebarFooter}>
                    <Button type="light" disabled to="/support">
                        <Lifebuoy className={styles.sidebarFooterButtonIcon} />

                        <span className={sidebar.sidebarFooterButtonText}>Обратная связь</span>
                    </Button>

                    <div className={styles.sidebarFooterSocials}>
                        <a href="https://vk.com/resezvk" target='_blanc' className={styles.sidebarFooterSocial}>
                            <Vk />
                        </a>
                    </div>

                    <Link to="/docs/rules" className={styles.sidebarFooterLink}>Правила проекта</Link>
                    <Link to="/docs/publicoffer" className={styles.sidebarFooterLink}>Публичная оферта</Link>
                </div>
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