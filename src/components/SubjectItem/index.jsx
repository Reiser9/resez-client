import React from 'react';
import { useNavigate } from 'react-router-dom';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Delete, DotsHorizontal, Edit } from '../Icons';

import TextPoint from '../TextPoint';
import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';
import IconButton from '../IconButton';
import LoaderForItem from '../LoaderForItem';
import ConfirmModal from '../Modal/ConfirmModal';

const SubjectItem = ({
    data,
    deleteSubject = () => {},
    loading = false
}) => {
    const {id, subject, isPublished, tasksCount} = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className={`${base.item3} ${styles.subjectItem}`}>
                <div className={styles.subjectItemWrapper}>
                    {subject && <p className={typography.h4}>{subject}</p>}

                    <HoverMenu
                        button={
                            <IconButton small type="light" onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        <MenuLink onClick={() => navigate(`subject/edit/${id}`)}>
                            <Edit />

                            Редактировать
                        </MenuLink>

                        <MenuLink danger onClick={() => setConfirmDelete(true)}>
                            <Delete />

                            Удалить
                        </MenuLink>
                    </HoverMenu>
                </div>

                <TextPoint title="Количество заданий" text={tasksCount || 0} />
                <TextPoint title="Статус" text={isPublished ? "Опубликован" : "Черновик"} />

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text={`Вы действительно хотите удалить предмет "${subject}"?`}
                callback={deleteSubject}
            />
        </>
    )
}

export default SubjectItem;