import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Switch } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowBottom, Exit, Moon, Notify, User } from '../Icons';

import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

const Header = ({empty = false}) => {
    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);
    const {theme, changeTheme} = useTheme();
    const {logout} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout(() => navigate("/"));
    }

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.headerLogoInner}>
                <p className={styles.headerLogo}>ResEz</p>
            </Link>

            {!empty && (isAuth
                ? <div className={styles.headerProfileInner}>
                    <div className={styles.headerProfileImgInner}>
                        {user.avatar && <img src={user.avatar} alt="avatar" className={styles.headerProfileImg} />}
                    </div>

                    <p className={`${typography.text} ${styles.headerProfileNick}`}>
                        {user.nickname}
                    </p>

                    <ArrowBottom className={styles.headerProfileArrow} />

                    <div className={styles.headerProfileMenuInner}>
                        <div className={styles.headerProfileMenu}>
                            <div className={styles.headerProfileMenuInfo}>
                                <div className={styles.headerProfileMenuData}>
                                    <div className={styles.headerProfileMenuImgInner}>
                                        {user.avatar && <img src={user.avatar} alt="avatar" className={styles.headerProfileMenuImg} />}
                                    </div>

                                    <div className={styles.headerProfileMenuNameInner}>
                                        <p className={`${typography.text} ${styles.headerProfileMenuName}`}>{user.nickname}</p>

                                        <p className={`${typography.text2} ${styles.headerProfileMenuStatus}`}>{user.status}</p>
                                    </div>
                                </div>

                                <div className={`${typography.text2} ${styles.headerProfileLvl}`}>
                                    {user.level}
                                </div>
                            </div>

                            <Link to="/profile" className={styles.headerProfileMenuLink}>
                                <User />

                                Профиль
                            </Link>

                            <Link to="/notifies" className={styles.headerProfileMenuLink}>
                                <Notify />

                                Уведомления
                            </Link>

                            <div className={styles.headerProfileMenuLink} onClick={changeTheme}>
                                <Moon />

                                Темная тема

                                <Switch size="small" checked={theme === "dark"} className={styles.headerThemeLabel} />
                            </div>

                            <div className={`${styles.headerProfileMenuLink} ${styles.delete}`} onClick={logoutHandler}>
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
    )
}

export default Header;