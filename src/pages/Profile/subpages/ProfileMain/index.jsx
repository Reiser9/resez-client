import React from 'react';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { CONFIG } from '../../../../consts/CONFIG';

import { Block, Delete, DotsHorizontal, Edit, Eye, Friends, Message, Qr, User } from '../../../../components/Icons';

import useUser from '../../../../hooks/useUser';
import useUtils from '../../../../hooks/useUtils';

import Button from '../../../../components/Button';
import SidebarLink from '../../../../components/SidebarLink';
import IconButton from '../../../../components/IconButton';
import File from '../../../../components/File';

const ProfileMain = () => {
    const [moreProfileMenu, setMoreProfileMenu] = React.useState(false);
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

    const closeProfileMenu = () => {
        setMoreProfileMenu(false);
    }

    const handleOutsideClick = (e) => {
        if (profileMenuMoreRef.current && !profileMenuMoreRef.current.contains(e.target)) {
            closeProfileMenu();
        }
    };
  
    React.useEffect(() => {
        getProfileInfo();
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const {nickname, avatar, theme} = user;
    const {firstName, lastName} = profileData;

    return (
        <div className={styles.content}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileBannerInner}> 
                    {/* <img src="/assets/img/banner.jpg" alt="banner" className={styles.profileBanner} /> */}

                    <div className={styles.profileAvatarInner}>
                        <File id="profileAvatar" withDelete={avatar} loadedCallback={changeAvatarHandler} deleteCallback={deleteAvatarHandler} />

                        {avatar
                        ? <img src={avatar} alt="avatar" className={styles.profileAvatar} />
                        : <p className={`${typography.h1} ${styles.profileAvatarEmpty}`}>{nickname && nickname[0].toUpperCase()}</p>}

                        <Tooltip title="Тема пользователя" placement="bottom">
                            <div className={styles.profileInfoTheme} style={{background: theme?.primary || CONFIG.BASE_COLOR}}></div>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.profileInfoInner}>
                    <div className={styles.profileInfoNameInner}>
                        {firstName && lastName && <h1 className={typography.h3}>{firstName} {lastName}</h1>}

                        <Tooltip title="Скопировать" placement="bottom">
                            <p className={`${typography.text2} ${styles.profileInfoNick}`} onClick={() => copyTextWithNotify(nickname, "Ник скопирован")}>{nickname}</p>
                        </Tooltip>
                    </div>

                    <div className={styles.profileInfoItem}>
                        <Tooltip title="Просмотр профиля">
                            <IconButton type="light">
                                <Eye />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="QR-код профиля">
                            <IconButton type="light">
                                <Qr />
                            </IconButton>
                        </Tooltip>

                        <div className={styles.profileMoreInner} ref={profileMenuMoreRef}>
                            <IconButton type="light" onClick={() => setMoreProfileMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>

                            <div className={`${styles.profileMoreWrapper}${moreProfileMenu ? ` ${styles.active}` : ""}`} onClick={() => setMoreProfileMenu(false)}>
                                <div className={styles.profileMore}>
                                    <div className={styles.profileMoreContent} onClick={e => e.stopPropagation()}>
                                        <div className={styles.profileMoreLink}>
                                            <Edit />

                                            Редактировать
                                        </div>

                                        <div className={styles.profileMoreLink}>
                                            <Message />

                                            Сообщение
                                        </div>

                                        <div className={styles.profileMoreLink}>
                                            <User />

                                            Добавить в друзья
                                        </div>

                                        <div className={`${styles.profileMoreLink} ${styles.delete}`}>
                                            <Block />

                                            Заблокировать
                                        </div>

                                        <div className={`${styles.profileMoreLink} ${styles.delete}`}>
                                            <Delete />

                                            Удалить из друзей
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.profileContent}>
                    
                </div>

                <div className={styles.sidebar}>
                    <SidebarLink to="/profile">
                        <User />

                        Профиль
                    </SidebarLink>

                    <SidebarLink to="/profile/friends">
                        <Friends />

                        Друзья
                    </SidebarLink>
                </div>
            </div>
        </div>
    )
}

export default ProfileMain;