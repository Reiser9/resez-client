import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import { ArrowRight, Code, Fire, Tests, Training, Trophy } from "../../components/Icons";
import useAuth from "../../hooks/useAuth";

const Main = () => {
    const {newTokens} = useAuth();

    return (
        <div className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <NavLink to="/training" className={styles.sidebarLink}>
                    <Training />
                    
                    Тренинг
                </NavLink>

                <NavLink to="/tests" className={styles.sidebarLink}>
                    <Tests />
                    
                    Тесты
                </NavLink>

                <NavLink to="/info" className={styles.sidebarLink}>
                    <Fire />
                    
                    Полезная информация
                </NavLink>

                <NavLink to="/achievements" className={styles.sidebarLink}>
                    <Trophy />
                    
                    Достижения
                </NavLink>

                <NavLink to="/admin" className={styles.sidebarLink}>
                    <Code />
                    
                    Админка
                </NavLink>
            </aside>

            <div className={styles.content}>
                <div className={styles.mainBlocks}>
                    <div className={styles.mainBlock}>
                        <div className={styles.mainBlockContent}>
                            <h1 className={`${typography.h1} ${styles.mainTitle}`} onClick={newTokens}>Подготовиться к ЕГЭ? <span>Легко!</span></h1>

                            <p className={`${typography.text} ${styles.mainSubtitle}`}>
                                <span>ResEz</span> создан для вашей комфортной подготовки, расскажем все, что вас будет ждать на действующем экзамене
                            </p>

                            <Link to="/info" className={styles.mainBlockLink}>
                                Подробнее

                                <ArrowRight />
                            </Link>
                        </div>

                        <div className={styles.mainBlockImgInner}>
                            <img src="/assets/img/study.svg" alt="study" className={styles.mainBlockImg} />
                        </div>
                    </div>

                    <div className={styles.mainBlock}>
                        <div className={styles.mainBlockContent}>
                            <h1 className={`${typography.h2} ${styles.mainTitle}`}>Практикуйтесь <span>каждый день</span></h1>

                            <p className={`${typography.text} ${styles.mainSubtitle}`}>
                                Добавляй предмет для подготовки в <span>тренинг</span> и при каждом заходе на сайт ты будешь видеть быструю задачу на повторение
                            </p>

                            <Link to="/info" className={styles.mainBlockLink}>
                                Подробнее

                                <ArrowRight />
                            </Link>
                        </div>

                        <div className={styles.mainBlockImgInner}>
                            <img src="/assets/img/test.svg" alt="test" className={styles.mainBlockImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
