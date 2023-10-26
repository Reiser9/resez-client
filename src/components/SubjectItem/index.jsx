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
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';

const SubjectItem = ({
    data,
    deleteSubject = () => {},
    loading = false,
    edit = false,
    remove = false
}) => {
    const {id, subject, isPublished, subjectTasksCount, tasksCount} = data || {};

    const [confirmText, setConfirmText] = React.useState("");
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className={`${base.item3} ${styles.subjectItem}`}>
                <div className={styles.subjectItemWrapper}>
                    {subject && <p className={typography.h4}>{subject}</p>}

                    {(edit || remove) &&<HoverMenu
                        button={
                            <IconButton small type="light" onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        {edit && <MenuLink onClick={() => navigate(`subject/edit/${id}`)}>
                            <Edit />

                            Редактировать
                        </MenuLink>}

                        {remove && <MenuLink danger onClick={() => setConfirmDelete(true)}>
                            <Delete />

                            Удалить
                        </MenuLink>}
                    </HoverMenu>}
                </div>

                <TextPoint title="Количество заданий в предмете" text={subjectTasksCount || 0} />
                <TextPoint title="Статус" text={isPublished ? "Опубликован" : "Черновик"} />
                <TextPoint title="Количество созданных заданий" text={tasksCount || 0} />

                {loading && <LoaderForItem />}
            </div>

            <Modal value={confirmDelete} setValue={setConfirmDelete} title={`Удаление предмета: ${subject}`} size="small">
                <p className={`${typography.text2} ${base.warningText}`}>Внимание! Удаляя предмет, удалятся и все задания, связанные с ним, будьте внимательны, перед тем, как удаляете предмет</p>

                <p className={typography.text2}>Чтобы удалить предмет, напишите слово ПОДТВЕРДИТЬ в поле ниже</p>

                <Input value={confirmText} setValue={setConfirmText} />

                <Button loading={loading} onClick={deleteSubject} disabled={confirmText.toLowerCase() !== "подтвердить"}>
                    Удалить
                </Button>
            </Modal>
        </>
    )
}

export default SubjectItem;