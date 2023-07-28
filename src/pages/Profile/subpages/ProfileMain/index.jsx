import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { DotsHorizontal, Eye, Friends, User } from '../../../../components/Icons';

import useUser from '../../../../hooks/useUser';
import useUtils from '../../../../hooks/useUtils';

import Button from '../../../../components/Button';
import SidebarLink from '../../../../components/SidebarLink';
import IconButton from '../../../../components/IconButton';
import File from '../../../../components/File';
import { useSelector } from 'react-redux';

const ProfileMain = () => {
    const {user} = useSelector(state => state.user);

    const {copyTextWithNotify} = useUtils();
    const {changeAvatar} = useUser();

    const changeAvatarHandler = (newAvatar) => {
        let formData = new FormData();

        formData.append("avatar", newAvatar);

        changeAvatar(formData);
    }

    const {nickname, avatar} = user;

    return (
        <div className={styles.content}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileBannerInner}>
                    {/* <img src="/assets/img/banner.jpg" alt="banner" className={styles.profileBanner} /> */}

                    <div className={styles.profileAvatarInner}>
                        <File id="profileAvatar" loadedCallback={changeAvatarHandler} />

                        {avatar
                        ? <img src={avatar} alt="avatar" className={styles.profileAvatar} />
                        : <p className={`${typography.h1} ${styles.profileAvatarEmpty}`}>{nickname && nickname[0].toUpperCase()}</p>}

                        <Tooltip title="Тема пользователя" placement="bottom">
                            <div className={styles.profileInfoTheme} style={{background: "var(--main)"}}></div>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.profileInfoInner}>
                    <div className={styles.profileInfoNameInner}>
                        <h1 className={typography.h3}>Егор Ветров</h1>

                        <Tooltip title="Скопировать" placement="bottom">
                            <p className={`${typography.text2} ${styles.profileInfoNick}`} onClick={() => copyTextWithNotify("xw1nchester")}>xw1nchester</p>
                        </Tooltip>
                    </div>

                    <div className={styles.profileInfoItem}>
                        <Button auto type="light">
                            Редактировать
                        </Button>

                        <Tooltip title="Просмотр профиля">
                            <IconButton type="light">
                                <Eye />
                            </IconButton>
                        </Tooltip>

                        <IconButton type="light">
                            <DotsHorizontal />
                        </IconButton>
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