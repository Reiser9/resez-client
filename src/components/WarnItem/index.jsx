import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { formatDate } from '../../utils/formatDate';

import { Check, Cross, DotsHorizontal } from '../Icons';

import TextPoint from '../TextPoint';
import HoverMenu from '../HoverMenu';
import IconButton from '../IconButton';
import MenuLink from '../HoverMenu/MenuLink';
import { Link } from 'react-router-dom';

const WarnItem = ({
    data,
    loading,
    ...props
}) => {
    const [actionMenu, setActionMenu] = React.useState(false);

    const {id, targetId, description, date, user} = data || {};
    const {id: authorId, nickname, avatar} = user || {};
    const {user: userData} = useSelector(state => state.user);
    const {settings, id: userId} = userData || {};
    const {isShowAvatars} = settings || {};

    return (
        <div className={`${base.item3} ${base.baseWrapperGap12} ${styles.warnItem}`} {...props}>
            <div className={base.titleInner}>
                <p className={styles.warnItemDate}>{formatDate(date)}</p>

                <HoverMenu
                    button={<IconButton small type="light" onClick={() => setActionMenu(prev => !prev)}>
                        <DotsHorizontal />
                    </IconButton>}
                    value={actionMenu}
                    setValue={setActionMenu}
                >
                    <MenuLink disabled>
                        <Check />

                        Принять
                    </MenuLink>

                    <MenuLink disabled danger>
                        <Cross />

                        Отклонить
                    </MenuLink>
                </HoverMenu>
            </div>

            <TextPoint title="Задание">
                <Link to={`/task/${targetId}`} className={styles.link}>{targetId}</Link>
            </TextPoint>

            <TextPoint title="Сообщение" text={description} />

            <div className={base.titleWrapper}>
                <div className={base.circle40}>
                    {avatar && !isShowAvatars || userId === authorId
                        ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                        : nickname && nickname[0]}
                </div>

                <p className={typography.text}>{nickname}</p>
            </div>
        </div>
    )
}

export default WarnItem;