import React from 'react';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Delete, Dislike, DotsHorizontal, Edit, Id, Like, Star, User } from '../Icons';

import TextPoint from '../TextPoint';
import IconButton from '../IconButton';
import ConfirmModal from '../Modal/ConfirmModal';
import LoaderForItem from '../LoaderForItem';
import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';

const ThemeItemAdmin = ({data, themeDelete = () => {}, loading = false}) => {
    const {primary, light, id, likesCount, dislikesCount, usersCount, isRatingEnabled} = data;

    const [eventMenu, setEventMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className={`${base.item4} ${styles.appearanceItem}`}>
                <div className={base.baseWrapperGap20}>
                    <div className={styles.appearanceItemThemeContent}>
                        {primary && light && <div className={styles.appearanceItemTheme}>
                            <div className={styles.appearanceItemThemeMain} style={{background: primary, border: `1px solid ${primary}`}}></div>
                            <div className={styles.appearanceItemThemeSecondary} style={{background: light, border: `1px solid ${primary}`}}></div>
                        </div>}

                        <HoverMenu
                            button={
                                <IconButton small type="light" onClick={() => setEventMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={eventMenu}
                            setValue={setEventMenu}
                        >
                            <MenuLink onClick={() => navigate(`theme/edit/${id}`)}>
                                <Edit />

                                Редактировать
                            </MenuLink>

                            <MenuLink danger onClick={() => {
                                setConfirmDelete(true);
                                setEventMenu(false);
                            }}>
                                <Delete />

                                Удалить
                            </MenuLink>
                        </HoverMenu>
                    </div>

                    <div className={styles.apperanceItemStatsInner}>
                        {id && <Tooltip title="ID">
                            <div className={styles.apperanceItemStatsItem}>
                                <Id />

                                {id}
                            </div>
                        </Tooltip>}

                        <Tooltip title="Используют тему">
                            <div className={styles.apperanceItemStatsItem}>
                                <User />

                                {usersCount || 0}
                            </div>
                        </Tooltip>

                        <Tooltip title="Лайков">
                            <div className={styles.apperanceItemStatsItem}>
                                <Like />

                                {likesCount || 0}
                            </div>
                        </Tooltip>

                        <Tooltip title="Дизлайков">
                            <div className={styles.apperanceItemStatsItem}>
                                <Dislike />

                                {dislikesCount || 0}
                            </div>
                        </Tooltip>

                        <Tooltip title="Оценка пользователями">
                            <div className={styles.apperanceItemStatsItem}>
                                <Star />

                                {isRatingEnabled ? "Включена" : "Выключена"}
                            </div>
                        </Tooltip>
                    </div>

                    <div className={base.baseWrapperGap12}>
                        <TextPoint title="Primary" text={primary || "---"} />
                        <TextPoint title="Lighten" text={light || "---"} />
                    </div>
                </div>

                {loading && <LoaderForItem />}
            </div>

            <ConfirmModal value={confirmDelete} setValue={setConfirmDelete} text="Вы действительно хотите удалить данную тему?" callback={themeDelete} />
        </>
    )
}

export default ThemeItemAdmin;