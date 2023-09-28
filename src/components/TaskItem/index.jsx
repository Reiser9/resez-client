import React from 'react';
import parse from 'html-react-parser';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Delete, DotsHorizontal, Edit } from '../Icons';

import { formatDate } from '../../utils/formatDate';

import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';
import IconButton from '../IconButton';
import LoaderForItem from '../LoaderForItem';
import ConfirmModal from '../Modal/ConfirmModal';

const TaskItem = ({
    data,
    deleteTask = () => {},
    loading = false
}) => {
    const {date, subject, theme, subTheme, user, task, number} = data || {};
    const {nickname, avatar} = user || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.baseWrapperGap8}>
                    <div className={`${base.titleInnerNowrap} ${styles.taskItemInner}`}>
                        <div className={styles.taskItemWrapper}>
                            <div className={base.titleWrapper}>
                                <div className={base.circle32}>
                                    {number}
                                </div>

                                <p className={typography.h4}>{subject}</p>
                            </div>

                            <p className={styles.taskTheme}>{theme}</p>

                            <p className={styles.taskTheme}>{subTheme}</p>
                        </div>

                        <HoverMenu
                            button={
                                <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={actionMenu}
                            setValue={setActionMenu}
                        >
                            <MenuLink>
                                <Edit />

                                Редактировать
                            </MenuLink>

                            <MenuLink danger onClick={() => setConfirmDelete(true)}>
                                <Delete />

                                Удалить
                            </MenuLink>
                        </HoverMenu>
                    </div>
                    
                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <div className={base.circle40}>
                                {avatar
                                    ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                                    : nickname && nickname[0]}
                            </div>

                            <p className={typography.text}>{nickname}</p>
                        </div>

                        <p className={`${typography.text2} ${styles.taskItemDate}`}>
                            {formatDate(date)}
                        </p>
                    </div>
                </div>

                <div className={styles.taskItemContent}>
                    {parse(task)}
                </div>

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal
                text="Вы действительно хотите удалить задание?"
                value={confirmDelete}
                setValue={setConfirmDelete}
                callback={deleteTask}
            />
        </>
    )
}

export default TaskItem;