import React from "react";

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import { Practice, Study, Theme, Messager } from "../../components/Icons";

import TitleWrapper from "../../components/Wrapper/TitleWrapper";
import WithSidebarWrapper from "../../components/Wrapper/WithSidebarWrapper";
import Block from "./Block";
import Button from "../../components/Button";

import { useDispatch } from "react-redux";
import { CALL_STATUSES } from "../../consts/CALL_STATUSES";
import { setCallStatus, setRingtonIsPlaying } from "../../redux/slices/call";

const Main = () => {
    const dispatch = useDispatch();

    return (
        <TitleWrapper pageTitle="ResEz">
            <WithSidebarWrapper container="full">
                <div className={styles.mainBlocks}>
                    <Block
                        title="Подготовиться к ЕГЭ? <span>Легко!</span>"
                        text="<span>ResEz</span> создан для вашей комфортной подготовки, расскажем все, что вас будет ждать на действующем экзамене."
                        buttonText="Подробнее"
                        to="/tests"
                        icon={<Study />}
                        titleTag="h1"
                    />

                    <Block
                        title="Практикуйтесь <span>каждый день</span>"
                        text="В разделе <span>тренинг</span> вы найдете множество упражнений для подготовки."
                        buttonText="Подробнее"
                        to="/training"
                        icon={<Practice />}
                        titleTag="h2"
                    />
                </div>

                <div style={{display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12}}>
                    <Button auto onClick={() => {
                        dispatch(setCallStatus(CALL_STATUSES.INCOMING));
                        dispatch(setRingtonIsPlaying(true));
                    }}>Входящий</Button>
                    <Button auto onClick={() => dispatch(setCallStatus(CALL_STATUSES.OUTCOMING))}>Исходящий</Button>
                    <Button auto onClick={() => dispatch(setCallStatus(CALL_STATUSES.PROCESS))}>Процесс</Button>
                    <Button auto onClick={() => dispatch(setCallStatus(CALL_STATUSES.REJECTED))}>Отклонен</Button>
                    <Button auto onClick={() => dispatch(setCallStatus(CALL_STATUSES.ENDED))}>Окончен</Button>
                    <Button auto onClick={() => dispatch(setCallStatus(CALL_STATUSES.TALKING))}>Разговаривает</Button>
                </div>

                <div className={styles.benefits}>
                    <h3 className={`${typography.h1} ${styles.benefitsTitle}`}>Что крутого у нас есть?</h3>

                    <div className={styles.benefitsContent}>
                        <Block
                            title="Достижения"
                            text="Выполняй задания и получай опыт, монеты и эксклюзивные награды."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Система уровней"
                            text="Соревнуйтесь с друзьями и с другими людьми, с которыми познакомитесь на нашем проекте. Покажите всем, что вы не из робкого десятка."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Техническая поддержка"
                            text="Что бы у вас не случилось - мы всегда на связи и поможем решить любой ваш вопрос. Также, если вы нашли ошибку или же у вас есть предложение по улучшению нашего проекта - будем только рады."
                            type="small"
                            smallPadding
                        />

                        <Block
                            title="Цветовая палитра сайта"
                            text="Надоел цвет сайта? Не беда! Меняй его на тот, который тебе по душе. Также в профиле ты найдешь много разных настроек, которые помогут сделать наш сайт для тебя комфортным и удобным, в общем, веселись в свое удовольствие!"
                            smallPadding
                            to="/profile/theme"
                            buttonText="Поменять цвет сайта"
                            icon={<Theme />}
                        />

                        <Block
                            title="Мессенджер"
                            text="Добавляй в друзья, общайся с утра до ночи, весело проводи время, готовься к экзаменам, задавай вопросы и весело проводи время, все это в одном месте."
                            smallPadding
                            to="/message"
                            buttonText="Общаться"
                            icon={<Messager />}
                        />
                    </div>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    );
};

export default Main;