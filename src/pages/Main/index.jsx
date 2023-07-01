import React from "react";
import { Link, NavLink } from "react-router-dom";

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import { ArrowRight, Code, Fire, Message, Practice, Study, Tests, Theme, Training, Trophy, Messager } from "../../components/Icons";

import TitleWrpapper from "../../components/Wrapper/TitleWrapper";

const Main = () => {
    return (
        <TitleWrpapper pageTitle="ResEz">
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

                    <NavLink to="/message" className={styles.sidebarLink}>
                        <Message />
                        
                        Мессенджер
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
                                <h1 className={`${typography.h1} ${styles.mainTitle}`}>Подготовиться к ЕГЭ? <span>Легко!</span></h1>

                                <p className={`${typography.text} ${styles.mainSubtitle}`}>
                                    <span>ResEz</span> создан для вашей комфортной подготовки, расскажем все, что вас будет ждать на действующем экзамене
                                </p>

                                <Link to="/info" className={styles.mainBlockLink}>
                                    Подробнее

                                    <ArrowRight />
                                </Link>
                            </div>

                            <div className={styles.mainBlockImgInner}>
                                <Study className={styles.mainBlockImg} />
                            </div>
                        </div>

                        <div className={styles.mainBlock}>
                            <div className={styles.mainBlockContent}>
                                <h2 className={`${typography.h2} ${styles.mainTitle}`}>Практикуйтесь <span>каждый день</span></h2>

                                <p className={`${typography.text} ${styles.mainSubtitle}`}>
                                    Добавляй предмет для подготовки в <span>тренинг</span> и при каждом заходе на сайт ты будешь видеть быструю задачу на повторение
                                </p>

                                <Link to="/info" className={styles.mainBlockLink}>
                                    Подробнее

                                    <ArrowRight />
                                </Link>
                            </div>

                            <div className={styles.mainBlockImgInner}>
                                <Practice className={styles.mainBlockImg} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.benefits}>
                        <h3 className={`${typography.h1} ${styles.benefitsTitle}`}>Что крутого у нас есть?</h3>

                        <div className={styles.benefitsContent}>
                            <div className={`${styles.benefitsItem} ${styles.small}`}>
                                <div className={styles.benefitsItemTextInner}>
                                    <h4 className={typography.h3}>Достижения</h4>

                                    <p className={typography.text}>
                                        Выполняй задания и получай эксклюзивные награды, которые никак больше не получить.
                                    </p>
                                </div>
                            </div>

                            <div className={`${styles.benefitsItem} ${styles.small}`}>
                                <div className={styles.benefitsItemTextInner}>
                                    <h4 className={typography.h3}>Система уровней</h4>

                                    <p className={typography.text}>
                                    Соревнуйтесь с друзьями и с другими людьми, с которыми познакомитесь на нашем проекте. Покажите всем, кто тут батя с наивысшим уровнем знаний.
                                    </p>
                                </div>
                            </div>

                            <div className={`${styles.benefitsItem} ${styles.small}`}>
                                <div className={styles.benefitsItemTextInner}>
                                    <h4 className={typography.h3}>Техническая поддержка</h4>

                                    <p className={typography.text}>
                                        Что бы у вас не случилось - мы всегда на связи и поможем решить любой ваш вопрос. Также, если вы нашли ошибку или же у вас есть предложение по улучшению нашего проекта - милости прошу.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.benefitsItem}>
                                <div className={styles.benefitsItemTextInner}>
                                    <h4 className={typography.h3}>Цветовая палитра сайта</h4>

                                    <p className={typography.text}>
                                        Надоел цвет сайта? Не беда! Меняй его на тот, который тебе по душе. Также в профиле ты найдешь много разных настроек, которые помогут сделать наш сайт для тебя комфортным и удобным, в общем, веселись в свое удовольствие!
                                    </p>

                                    <Link to="/info" className={styles.mainBlockLink}>
                                        В профиль

                                        <ArrowRight />
                                    </Link>
                                </div>

                                <div className={styles.mainBlockImgInner}>
                                    <Theme className={styles.mainBlockImg} />
                                </div>
                            </div>

                            <div className={styles.benefitsItem}>
                                <div className={styles.benefitsItemTextInner}>
                                    <h4 className={typography.h3}>Мессенджер</h4>

                                    <p className={typography.text}>
                                        Добавляй в друзья, общайся с утра до ночи, весело проводи время, готовься к экзаменам, задавай вопросы и весело проводи время, все это в одном месте.
                                    </p>

                                    <Link to="/info" className={styles.mainBlockLink}>
                                        Общаться

                                        <ArrowRight />
                                    </Link>
                                </div>

                                <div className={styles.mainBlockImgInner}>
                                    <Messager className={styles.mainBlockImg} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TitleWrpapper>
    );
};

export default Main;