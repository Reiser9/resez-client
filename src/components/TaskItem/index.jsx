import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    loading = false,
    edit = false,
    remove = false
}) => {
    const {id, date, subject, theme, subTheme, user, task, number} = data || {};
    const {id: authorId, nickname, avatar} = user || {};

    const {user: userData} = useSelector(state => state.user);
    const {settings, id: userId} = userData || {};
    const {isShowAvatars} = settings || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.baseWrapperGap12}>
                    <div className={`${base.titleInnerNowrap} ${base.aifs}`}>
                        <Link to={`/task/${id}`} className={styles.taskItemWrapper}>
                            <span className={base.titleWrapper}>
                                <span className={base.circle32}>
                                    {number}
                                </span>

                                <p className={typography.h4}>{subject}</p>
                            </span>

                            <p className={styles.taskTheme}>{theme}</p>

                            <p className={styles.taskTheme}>{subTheme}</p>
                        </Link>

                        {(edit || remove) && <HoverMenu
                            button={
                                <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={actionMenu}
                            setValue={setActionMenu}
                        >
                            {edit && <MenuLink>
                                <Edit />

                                Редактировать
                            </MenuLink>}

                            {remove && <MenuLink danger onClick={() => setConfirmDelete(true)}>
                                <Delete />

                                Удалить
                            </MenuLink>}
                        </HoverMenu>}
                    </div>
                    
                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <div className={base.circle40}>
                                {avatar && !isShowAvatars || userId === authorId
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

                {task && <div className={base.format}>
                    {parse(task)}
                </div>}

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