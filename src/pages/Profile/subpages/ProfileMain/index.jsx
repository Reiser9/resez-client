import React from 'react';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { CONFIG } from '../../../../consts/CONFIG';

import { Block, Delete, DotsHorizontal, Edit, Eye, Friends, Message, Qr, User } from '../../../../components/Icons';

import useUser from '../../../../hooks/useUser';
import useUtils from '../../../../hooks/useUtils';

import SidebarLink from '../../../../components/SidebarLink';
import IconButton from '../../../../components/IconButton';
import File from '../../../../components/File';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';

const ProfileMain = () => {
    const [moreProfileMenu, setMoreProfileMenu] = React.useState(false);
    const [confirmDeleteAvatar, setConfirmDeleteAvatar] = React.useState(false);
    const {user, profileData} = useSelector(state => state.user);

    const {copyTextWithNotify} = useUtils();
    const {changeAvatar, deleteAvatar, getProfileInfo} = useUser();

    const profileMenuMoreRef = React.useRef(null);

    const changeAvatarHandler = (newAvatar, callback) => {
        let formData = new FormData();

        formData.append("avatar", newAvatar);

        changeAvatar(formData, callback);
    }

    const deleteAvatarHandler = (callback) => {
        deleteAvatar(callback);
    }
  
    React.useEffect(() => {
        getProfileInfo();
    }, []);

    const {nickname, avatar, theme} = user;
    const {firstName, lastName} = profileData;

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.baseWrapperGap0}>
                <div className={styles.profileBannerInner}> 
                    {/* <img src="/assets/img/banner.jpg" alt="banner" className={styles.profileBanner} /> */}

                    <div className={styles.profileAvatarInner}>
                        <File id="profileAvatar" withDelete={avatar} loadedCallback={changeAvatarHandler} deleteCallback={deleteAvatarHandler} />

                        {avatar
                        ? <img src={avatar} alt="avatar" className={styles.profileAvatar} />
                        : <p className={`${typography.h1} ${styles.profileAvatarEmpty}`}>{nickname && nickname[0]}</p>}

                        <Tooltip title="Тема пользователя" placement="bottom">
                            <div className={styles.profileInfoTheme} style={{background: theme?.primary || CONFIG.BASE_COLOR}}></div>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.profileInfoInner}>
                    <div className={styles.profileInfoNameInner}>
                        {firstName && lastName && <h1 className={typography.h3}>{firstName} {lastName}</h1>}

                        <Tooltip title="Скопировать" placement="bottom">
                            <p className={`${typography.text2} ${styles.profileInfoNick}`} onClick={() => copyTextWithNotify(nickname, "Имя пользователя скопировано")}>{nickname}</p>
                        </Tooltip>
                    </div>

                    <div className={styles.profileInfoItem}>
                        {/* <Tooltip title="Просмотр профиля">
                            <IconButton type="light" disabled>
                                <Eye />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="QR-код профиля">
                            <IconButton type="light" disabled>
                                <Qr />
                            </IconButton>
                        </Tooltip>
                        
                        <HoverMenu
                            button={
                                <IconButton type="light" onClick={() => setMoreProfileMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                            value={moreProfileMenu}
                            setValue={setMoreProfileMenu}
                        >
                            <MenuLink disabled>
                                <Edit />

                                Редактировать
                            </MenuLink>

                            <MenuLink disabled>
                                <Message />

                                Сообщение
                            </MenuLink>

                            <MenuLink disabled>
                                <User />

                                Добавить в друзья
                            </MenuLink>

                            <MenuLink danger disabled>
                                <Block />

                                Заблокировать
                            </MenuLink>

                            <MenuLink danger disabled>
                                <Delete />

                                Удалить из друзей
                            </MenuLink>
                        </HoverMenu> */}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default ProfileMain;