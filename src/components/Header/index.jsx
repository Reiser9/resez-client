import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Switch } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowBottom, Cross, Enter, Exit, Menu, Moon, Notify, Trophy, User } from '../Icons';

import { setSidebarShow } from '../../redux/slices/app';

import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

import ConfirmModal from '../Modal/ConfirmModal';
import HoverMenu from '../HoverMenu';
import Logo from './Logo';

const Header = ({empty = false}) => {
    const [profileMenu, setProfileMenu] = React.useState(false);
    const [confirmLeave, setConfirmLeave] = React.useState(false);

    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);
    const {mode} = useSelector(state => state.theme);
    const {sidebarShow} = useSelector(state => state.app);

    const {changeTheme} = useTheme();
    const {logout} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const profileMenuRef = React.useRef(null);

    const closeProfileMenu = () => {
        setProfileMenu(false);
    }

    const menuHandler = (e) => {
        e.stopPropagation();
        closeProfileMenu();
        dispatch(setSidebarShow(!sidebarShow));
    }

    const toggleMenuProfile = () => {
        setProfileMenu(prev => !prev);
        dispatch(setSidebarShow(false));
    }

    const logoutHandler = () => {
        logout(() => navigate("../../../"));
    }

    React.useEffect(() => {
        dispatch(setSidebarShow(false));
    }, [location]);

    const {avatar, nickname, status, level, unreadNotifiesCount} = user;

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLogoWrapper}>
                    {!empty && <div className={styles.menuIconInner} onClick={menuHandler}>
                        <Menu className={`${styles.menuIcon}${!sidebarShow ? ` ${styles.active}` : ""}`} />
                        <Cross className={`${styles.crossIcon}${sidebarShow ? ` ${styles.active}` : ""}`} />
                    </div>}

                    <Logo />
                </div>

                {!empty && <div className={styles.headerProfileInner} ref={profileMenuRef}>
                        <HoverMenu
                            button={
                                <div className={styles.headerProfileWrap} onClick={toggleMenuProfile}>
                                    <div className={`${styles.headerProfileImgInner}${unreadNotifiesCount > 0 ? ` ${styles.unread}` : ""}`}>
                                        {isAuth ? avatar
                                        ? <img src={avatar} alt="avatar" className={styles.headerProfileImg} />
                                        : nickname && <p className={styles.headerProfileName}>{nickname[0]}</p>
                                        : <Enter />}
                                    </div>

                                    {isAuth && <p className={`${typography.text} ${styles.headerProfileNick}`}>
                                        {nickname}
                                    </p>}

                                    <ArrowBottom className={`${styles.headerProfileArrow}${profileMenu ? ` ${styles.active}` : ""}`} />
                                </div>
                            }
                            value={profileMenu}
                            setValue={setProfileMenu}
                            big
                        >
                            {isAuth ? <>
                                <div className={styles.headerProfileMenuInfo}>
                                    <div className={styles.headerProfileMenuData}>
                                        <div className={styles.headerProfileMenuImgInner}>
                                            {avatar
                                            ? <img src={avatar} alt="avatar" className={styles.headerProfileMenuImg} />
                                            : nickname && <p className={styles.headerProfileName}>{nickname[0]}</p>}
                                        </div>

                                        <div className={styles.headerProfileMenuNameInner}>
                                            <p className={`${typography.text} ${styles.headerProfileMenuName}`}>{nickname}</p>

                                            <p className={`${typography.text2} ${styles.headerProfileMenuStatus}`}>{status}</p>
                                        </div>
                                    </div>

                                    <div className={`${typography.text2} ${styles.headerProfileLvl}`}>
                                        {level}
                                    </div>
                                </div>

                                <Link to="/profile" className={styles.headerProfileMenuLink} onClick={closeProfileMenu}>
                                    <User />

                                    Профиль
                                </Link>

                                <Link to="/notifies" className={styles.headerProfileMenuLink} onClick={closeProfileMenu}>
                                    <Notify />

                                    Уведомления

                                    {unreadNotifiesCount > 0 && <span className={styles.headerProfileNotifyCount}>{unreadNotifiesCount > 9 ? "9+" : unreadNotifiesCount}</span>}
                                </Link>

                                <Link to="/profile/achievements" className={styles.headerProfileMenuLink} onClick={closeProfileMenu}>
                                    <Trophy />

                                    Достижения
                                </Link>
                            </> :
                            <Link to="/login" className={styles.headerProfileMenuLink} onClick={closeProfileMenu}>
                                <User />

                                Войти
                            </Link>}

                            <div className={styles.headerProfileMenuLink} onClick={() => {
                                changeTheme();
                                closeProfileMenu();
                            }}>
                                <Moon />

                                Темная тема

                                <Switch size="small" checked={mode === "dark"} className={styles.headerThemeLabel} />
                            </div>

                            {isAuth && <div className={`${styles.headerProfileMenuLink} ${styles.delete}`} onClick={() => {
                                setConfirmLeave(true);
                                closeProfileMenu();
                            }}>
                                <Exit />

                                Выход
                            </div>}
                        </HoverMenu>
                    </div>}
            </header>

            {!empty
            && <ConfirmModal
                callback={logoutHandler}
                value={confirmLeave}
                setValue={setConfirmLeave}
                text="Вы действительно хотите выйти?"
                confirmText="Выйти"
                rejectText="Отмена"
            />}
        </>
    )
}

export default Header;