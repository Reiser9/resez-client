import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Switch } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowBottom, Exit, Moon, Notify, User } from '../Icons';

import useTheme from '../../hooks/useTheme';

const Header = ({empty = false}) => {
    const {isAuth} = useSelector(state => state.auth);
    const {theme, changeTheme} = useTheme();

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.headerLogoInner}>
                <img src="/assets/img/logo.svg" alt="logo" className={styles.headerLogo} />
            </Link>

            {!empty && (isAuth
                ? <div className={styles.headerProfileInner}>
                    <div className={styles.headerProfileImgInner}>
                        {/* <img src="/assets/img/test.svg" alt="test" className={styles.headerProfileImg} /> */}
                    </div>

                    <p className={`${typography.text} ${styles.headerProfileNick}`}>
                        Reiser95
                    </p>

                    <ArrowBottom className={styles.headerProfileArrow} />

                    <div className={styles.headerProfileMenuInner}>
                        <div className={styles.headerProfileMenu}>
                            <div className={styles.headerProfileMenuInfo}>
                                <div className={styles.headerProfileMenuData}>
                                    <div className={styles.headerProfileMenuImgInner}>
                                        {/* <img src="/assets/img/test.svg" alt="test" className={styles.headerProfileMenuImg} /> */}
                                    </div>

                                    <div className={styles.headerProfileMenuNameInner}>
                                        <p className={`${typography.text} ${styles.headerProfileMenuName}`}>Reiser95</p>

                                        <p className={`${typography.text2} ${styles.headerProfileMenuStatus}`}>Новичок</p>
                                    </div>
                                </div>

                                <div className={`${typography.text2} ${styles.headerProfileLvl}`}>
                                    1
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

                            <Link to="exit" className={`${styles.headerProfileMenuLink} ${styles.delete}`}>
                                <Exit />

                                Выход
                            </Link>
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