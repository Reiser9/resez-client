import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Switch } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowBottom, Cross, Exit, Menu, Moon, Notify, User } from '../Icons';

import { setSidebarShow } from '../../redux/slices/app';

import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

import ConfirmModal from '../Modal/ConfirmModal';

const Header = ({empty = false}) => {
    const [profileMenu, setProfileMenu] = React.useState(false);
    const [confirmLeave, setConfirmLeave] = React.useState(false);

    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);
    const {mode} = useSelector(state => state.theme);
    const {unreadCount} = useSelector(state => state.notify);
    const {sidebarShow} = useSelector(state => state.app);
    const {changeTheme} = useTheme();
    const {logout} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const profileMenuRef = React.useRef(null);

    const menuHandler = () => {
        dispatch(setSidebarShow(!sidebarShow));
    }

    const closeProfileMenu = () => {
        setProfileMenu(false);
    }

    const toggleMenuProfile = () => {
        setProfileMenu(prev => !prev);
        dispatch(setSidebarShow(false));
    }

    const logoutHandler = () => {
        logout(() => navigate("/"));
    }
  
    const handleOutsideClick = (e) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
            closeProfileMenu();
        }
    };
  
    React.useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    React.useEffect(() => {
        dispatch(setSidebarShow(false));
    }, [location]);

    const {avatar, nickname, status, level} = user;

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLogoWrapper}>
                    {!empty && <div className={styles.menuIconInner} onClick={menuHandler}>
                        <Menu className={`${styles.menuIcon}${!sidebarShow ? ` ${styles.active}` : ""}`} />
                        <Cross className={`${styles.crossIcon}${sidebarShow ? ` ${styles.active}` : ""}`} />
                    </div>}

                    <Link to="/" className={styles.headerLogoInner}>
                        <p className={styles.headerLogo}>ResEz</p>
                    </Link>
                </div>

                {!empty && (isAuth
                    ? <div className={styles.headerProfileInner} ref={profileMenuRef}>
                        <div className={styles.headerProfileWrap} onClick={toggleMenuProfile}>
                            <div className={styles.headerProfileImgInner}>
                                {avatar
                                ? <img src={avatar} alt="avatar" className={styles.headerProfileImg} />
                                : nickname && <p className={styles.headerProfileName}>{nickname[0].toUpperCase()}</p>}
                            </div>

                            <p className={`${typography.text} ${styles.headerProfileNick}`}>
                                {nickname}
                            </p>

                            <ArrowBottom className={`${styles.headerProfileArrow}${profileMenu ? ` ${styles.active}` : ""}`} />
                        </div>

                        <div className={`${styles.headerProfileMenuInner}${profileMenu ? ` ${styles.active}` : ""}`}>
                            <div className={styles.headerProfileMenu}>
                                <div className={styles.headerProfileMenuInfo}>
                                    <div className={styles.headerProfileMenuData}>
                                        <div className={styles.headerProfileMenuImgInner}>
                                            {avatar
                                            ? <img src={avatar} alt="avatar" className={styles.headerProfileMenuImg} />
                                            : nickname && <p className={styles.headerProfileName}>{nickname[0].toUpperCase()}</p>}
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

                                    {unreadCount !== 0 && <span className={styles.headerProfileNotifyCount}>{unreadCount > 10 ? "9+" : unreadCount}</span>}
                                </Link>

                                <div className={styles.headerProfileMenuLink} onClick={() => changeTheme()}>
                                    <Moon />

                                    Темная тема

                                    <Switch size="small" checked={mode === "dark"} className={styles.headerThemeLabel} />
                                </div>

                                <div className={`${styles.headerProfileMenuLink} ${styles.delete}`} onClick={() => {
                                    setConfirmLeave(true);
                                    closeProfileMenu();
                                }}>
                                    <Exit />

                                    Выход
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Link to="/login" className={styles.headerLogin}>
                        Войти
                    </Link>)}
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