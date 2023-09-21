import React from 'react';
import { useNavigate } from 'react-router-dom';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Delete, DotsHorizontal, Edit } from '../Icons';

import TextPoint from '../TextPoint';
import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';
import IconButton from '../IconButton';
import ConfirmModal from '../Modal/ConfirmModal';
import LoaderForItem from '../LoaderForItem';

const RoleItem = ({data, loading = false, deleteRole = () => {}}) => {
    const {id, role, permissionsCount, usersCount, textColor, backgroundColor} = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className={`${base.item4} ${styles.roleItem}`}>
                {role && <p className={styles.roleItemName} style={{background: backgroundColor, color: textColor}}>
                    {role}
                </p>}

                <TextPoint title="Используют" text={usersCount || 0} />

                <div className={styles.roleItemInfoInner}>
                    <TextPoint title="Привилегий" text={permissionsCount || 0} />

                    <HoverMenu
                        button={<IconButton small type="light" onClick={() => setActionMenu(prev => !prev)}>
                            <DotsHorizontal />
                        </IconButton>}
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        <MenuLink onClick={() => navigate(`${id}`)}>
                            <Edit />

                            Редактировать
                        </MenuLink>

                        <MenuLink danger onClick={() => {
                            setConfirmDelete(true);
                            setActionMenu(false);
                        }}>
                            <Delete />

                            Удалить
                        </MenuLink>
                    </HoverMenu>
                </div>

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text={`Вы действительно хотите удалить роль ${role}?`}
                callback={deleteRole}
            />
        </>
    )
}

export default RoleItem;