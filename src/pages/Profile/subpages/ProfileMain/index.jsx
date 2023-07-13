import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { DotsHorizontal, Eye, Friends, User } from '../../../../components/Icons';

import {copyText} from '../../../../utils/copyText';

import useNotify from '../../../../hooks/useNotify';

import Button from '../../../../components/Button';
import SidebarLink from '../../../../components/SidebarLink';

const ProfileMain = () => {
    const {alertNotify} = useNotify();

    const copyNick = () => {
        copyText("xw1nchester");
        alertNotify("Успешно", "Никнейм скопирован", "success");
    }

    return (
        <div className={styles.content}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileBannerInner}>
                    {/* <img src="/assets/img/banner.jpg" alt="banner" className={styles.profileBanner} /> */}

                    <div className={styles.profileAvatarInner}>
                        {/* <img src="/assets/img/banner.jpg" alt="banner" className={styles.profileAvatar} /> */}

                        <Tooltip title="Тема пользователя" placement="bottom">
                            <div className={styles.profileInfoTheme} style={{background: "var(--main)"}}></div>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.profileInfoInner}>
                    <div className={styles.profileInfoNameInner}>
                        <h1 className={typography.h3}>Егор Ветров</h1>

                        <Tooltip title="Скопировать" placement="bottom">
                            <p className={`${typography.text2} ${styles.profileInfoNick}`} onClick={copyNick}>xw1nchester</p>
                        </Tooltip>
                    </div>

                    <div className={styles.profileInfoItem}>
                        <Button auto type="light">
                            Редактировать
                        </Button>

                        <Tooltip title="Просмотр профиля">
                            <button className={styles.profileInfoButton}>
                                <Eye />
                            </button>
                        </Tooltip>

                        <button className={styles.profileInfoButton}>
                            <DotsHorizontal />
                        </button>
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