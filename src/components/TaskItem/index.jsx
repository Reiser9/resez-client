import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Check, Delete, DotsHorizontal, Edit, Verified } from '../Icons';

import { formatDate } from '../../utils/formatDate';

import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';
import IconButton from '../IconButton';
import LoaderForItem from '../LoaderForItem';
import ConfirmModal from '../Modal/ConfirmModal';
import CustomHtmlParser from '../CustomHtmlParser';
import { Tooltip } from 'antd';

const TaskItem = ({
    data,
    deleteTask = () => {},
    verifyTask = () => {},
    loading = false,
    edit = false,
    remove = false,
    verify = false
}) => {
    const {id, date, subject, theme, subTheme, user, task, number, isVerified} = data || {};
    const {id: authorId, nickname, avatar} = user || {};

    const {user: userData} = useSelector(state => state.user);
    const {settings, id: userId} = userData || {};
    const {isShowAvatars} = settings || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const navigate = useNavigate();

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

                        {(edit || remove || verify) && <HoverMenu
                            button={
                                <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={actionMenu}
                            setValue={setActionMenu}
                        >
                            {verify && !isVerified && <MenuLink onClick={verifyTask}>
                                <Check />

                                Проверено
                            </MenuLink>}

                            {edit && <MenuLink onClick={() => navigate(`task/edit/${id}`)}>
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
                                {avatar && (!isShowAvatars || userId === authorId)
                                    ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                                    : nickname && nickname[0]}
                            </div>

                            <p className={typography.text}>{nickname}</p>
                        </div>

                        <div className={base.titleWrapper}>
                            <p className={`${typography.text2} ${styles.taskItemDate}`}>
                                {formatDate(date)}
                            </p>

                            {isVerified && <Tooltip title="Проверено">
                                <Verified className={styles.taskVerified} />    
                            </Tooltip>}
                        </div>
                    </div>
                </div>

                {task && <div className={base.format}>
                    <CustomHtmlParser html={task} />
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