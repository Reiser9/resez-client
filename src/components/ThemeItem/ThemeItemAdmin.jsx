import React from 'react';
import { Tooltip } from 'antd';

import styles from './index.module.css';

import { Delete, Dislike, Edit, Id, Like, Star, User } from '../Icons';

import useAdmin from '../../hooks/useAdmin';

import TextPoint from '../TextPoint';
import IconButton from '../IconButton';
import ConfirmModal from '../Modal/ConfirmModal';

const ThemeItemAdmin = ({data}) => {
    const {primary, light, id, likesCount, dislikesCount, usersCount, isRatingEnabled} = data;

    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const {removeTheme} = useAdmin();

    return (
        <>
            <div className={styles.appearanceItem}>
                <div className={styles.appearanceItemWrapper}>
                    <div className={styles.appearanceItemTheme}>
                        <div className={styles.appearanceItemThemeMain} style={{background: primary, border: `1px solid ${primary}`}}></div>
                        <div className={styles.appearanceItemThemeSecondary} style={{background: light, border: `1px solid ${primary}`}}></div>
                    </div>

                    <div className={styles.apperanceItemStatsInner}>
                        <Tooltip title="ID">
                            <div className={styles.apperanceItemStatsItem}>
                                <Id />

                                {id}
                            </div>
                        </Tooltip>

                        <Tooltip title="Используют тему">
                            <div className={styles.apperanceItemStatsItem}>
                                <User />

                                {usersCount}
                            </div>
                        </Tooltip>

                        <Tooltip title="Лайков">
                            <div className={styles.apperanceItemStatsItem}>
                                <Like />

                                {likesCount}
                            </div>
                        </Tooltip>

                        <Tooltip title="Дизлайков">
                            <div className={styles.apperanceItemStatsItem}>
                                <Dislike />

                                {dislikesCount}
                            </div>
                        </Tooltip>

                        <Tooltip title="Оценка пользователями">
                            <div className={styles.apperanceItemStatsItem}>
                                <Star />

                                {isRatingEnabled ? "Включена" : "Выключена"}
                            </div>
                        </Tooltip>
                    </div>

                    <div className={styles.appearanceItemPoints}>
                        <TextPoint title="Primary" text={primary} />
                        <TextPoint title="Lighten" text={light} />
                    </div>
                </div>

                <div className={styles.appearanceItemButtons}>
                    <Tooltip title="Редактировать">
                        <IconButton type="light" full to={`theme/edit/${id}`}>
                            <Edit />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Удалить">
                        <IconButton type="danger" full onClick={() => setConfirmDelete(true)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <ConfirmModal value={confirmDelete} setValue={setConfirmDelete} text="Вы действительно хотите удалить данную тему?" callback={() => removeTheme(id)} />
        </>
    )
}

export default ThemeItemAdmin;