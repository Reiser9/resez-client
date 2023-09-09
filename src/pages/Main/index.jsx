import React from "react";

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import { Practice, Study, Theme, Messager } from "../../components/Icons";

import TitleWrpapper from "../../components/Wrapper/TitleWrapper";
import WithSidebarWrapper from "../../components/Wrapper/WithSidebarWrapper";
import Block from "./Block";

const Main = () => {
    return (
        <TitleWrpapper pageTitle="ResEz">
            <WithSidebarWrapper container="full">
                <div className={styles.mainBlocks}>
                    <Block
                        title="Подготовиться к ЕГЭ? <span>Легко!</span>"
                        text="<span>ResEz</span> создан для вашей комфортной подготовки, расскажем все, что вас будет ждать на действующем экзамене"
                        buttonText="Подробнее"
                        to="/info"
                        icon={<Study />}
                        titleTag="h1"
                    />

                    <Block
                        title="Практикуйтесь <span>каждый день</span>"
                        text="Добавляй предмет для подготовки в <span>тренинг</span> и при каждом заходе на сайт ты будешь видеть быструю задачу на повторение"
                        buttonText="Подробнее"
                        to="/info"
                        icon={<Practice />}
                        titleTag="h2"
                    />
                </div>

                <div className={styles.benefits}>
                    <h3 className={`${typography.h1} ${styles.benefitsTitle}`}>Что крутого у нас есть?</h3>

                    <div className={styles.benefitsContent}>
                        <Block
                            title="Достижения"
                            text="Выполняй задания и получай эксклюзивные награды, которые никак больше не получить."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Система уровней"
                            text="Соревнуйтесь с друзьями и с другими людьми, с которыми познакомитесь на нашем проекте. Покажите всем, кто тут батя с наивысшим уровнем знаний."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Техническая поддержка"
                            text="Что бы у вас не случилось - мы всегда на связи и поможем решить любой ваш вопрос. Также, если вы нашли ошибку или же у вас есть предложение по улучшению нашего проекта - милости прошу."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Цветовая палитра сайта"
                            text="Надоел цвет сайта? Не беда! Меняй его на тот, который тебе по душе. Также в профиле ты найдешь много разных настроек, которые помогут сделать наш сайт для тебя комфортным и удобным, в общем, веселись в свое удовольствие!"
                            smallPadding
                            to="/profile/theme"
                            buttonText="В профиль"
                            icon={<Theme />}
                        />

                        <Block
                            title="Мессенджер"
                            text="Добавляй в друзья, общайся с утра до ночи, весело проводи время, готовься к экзаменам, задавай вопросы и весело проводи время, все это в одном месте."
                            smallPadding
                            to="/info"
                            buttonText="Общаться"
                            icon={<Messager />}
                        />
                    </div>
                </div>
            </WithSidebarWrapper>
        </TitleWrpapper>
    );
};

export default Main;